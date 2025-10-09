# Fix for Static Files 404 Error

## Problem
The React app's static files (JavaScript and CSS) are returning 404 errors because nginx was configured to serve `/static/` from the wrong directory.

## Root Cause
- React/Vite builds the app into `/home/app/backend/frontend/dist/` with a subdirectory `/home/app/backend/frontend/dist/static/` for JS/CSS files
- The nginx configuration was pointing `/static/` to `/home/app/backend/staticfiles/` (Django's static files directory)
- This mismatch caused all React static files to return 404

## Solution
The nginx configuration has been updated to:
1. Serve `/static/` from `/home/app/backend/frontend/dist/static/` (React app assets)
2. Serve Django admin static files from `/django-static/`
3. Serve the React app's index.html directly from nginx instead of proxying to Django
4. Handle SPA routing with `try_files` for client-side routes

## Steps to Apply the Fix

### Step 1: Push Updated Configuration
From your **local machine**, push the updated nginx configuration:

```bash
git add nginx/conf.d/default.conf
git commit -m "Fix nginx configuration for React static files"
git push origin main
```

### Step 2: Update Server
On your **Tencent Cloud server** (101.42.231.188):

```bash
# Switch to appuser
sudo su - appuser
cd /opt/django-react-starter

# Pull the updated configuration
git pull origin main

# Restart nginx to apply the changes
docker compose -f docker-compose.prod.yml restart nginx
```

### Step 3: Verify the Fix
1. Open your browser to http://101.42.231.188
2. Open the browser console (F12)
3. Refresh the page (Ctrl+F5 or Cmd+Shift+R to force reload)
4. The page should now load properly with no 404 errors for static files

### Step 4: Test
- The React app should render correctly
- Check that the console shows no errors
- Navigate between pages to ensure routing works
- The favicon should also load correctly

## What Changed

### Before:
```nginx
location /static/ {
    alias /home/app/backend/staticfiles/;  # Wrong directory!
}

location / {
    proxy_pass http://django;  # Django was serving the React app
}
```

### After:
```nginx
location /static/ {
    alias /home/app/backend/frontend/dist/static/;  # Correct directory!
}

location /django-static/ {
    alias /home/app/backend/staticfiles/;  # Django static files moved here
}

location / {
    root /home/app/backend/frontend/dist;  # nginx serves React app directly
    try_files $uri $uri/ /index.html;  # SPA routing support
}
```

## Benefits of This Approach
1. **Better Performance**: nginx serves static files directly instead of proxying through Django
2. **Correct File Resolution**: Static files are served from the correct directory
3. **SPA Support**: Client-side routing works properly with `try_files`
4. **Separation of Concerns**: React assets separate from Django admin assets

## Troubleshooting

### If the page still shows 404 errors:
```bash
# Check nginx logs
docker compose -f docker-compose.prod.yml logs nginx --tail=50

# Verify files exist in container
docker compose -f docker-compose.prod.yml exec nginx ls -la /home/app/backend/frontend/dist/
docker compose -f docker-compose.prod.yml exec nginx ls -la /home/app/backend/frontend/dist/static/

# Test direct file access
curl http://101.42.231.188/static/index-COiS3hXT.js
```

### If nginx fails to restart:
```bash
# Check nginx configuration syntax
docker compose -f docker-compose.prod.yml exec nginx nginx -t

# View nginx error logs
docker compose -f docker-compose.prod.yml logs nginx
```

### Clear browser cache:
- Chrome/Edge: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
- Firefox: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
- Or use Incognito/Private browsing mode

## Note
If you need to access Django admin static files (CSS, JS for /admin/), they are now available at `/django-static/` instead of `/static/`.
