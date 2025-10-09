# Fix for Static Files 404 Error - UPDATED SOLUTION

## Problem
The React app's static files (JavaScript and CSS) are returning 404 errors because nginx couldn't access the files built inside the Docker container.

## Root Causes
1. React/Vite builds the app into `/home/app/backend/frontend/dist/` inside the Docker image during build
2. Nginx container had no volume mount to access these files
3. The nginx configuration was pointing `/static/` to the wrong directory (`/home/app/backend/staticfiles/` instead of `/home/app/backend/frontend/dist/static/`)

## Solution
The fix involves two changes:

### 1. Extract Frontend Files to Host
- Frontend dist files are extracted from the Docker image to `./frontend/dist/` on the host
- This directory is then mounted into the nginx container
- The `extract-frontend.sh` script handles this automatically

### 2. Updated Nginx Configuration
- `/static/` now serves from `/home/app/backend/frontend/dist/static/` (React app assets)
- Django admin static files moved to `/django-static/`
- React app's index.html served directly from nginx with SPA routing support

## Steps to Apply the Fix

### Step 1: Push Updated Configuration
From your **local machine**:

```bash
git add docker-compose.prod.yml nginx/conf.d/default.conf deploy.sh extract-frontend.sh .dockerignore
git commit -m "Fix static files: extract frontend dist to host and update nginx config"
git push origin main
```

### Step 2: Update and Rebuild on Server
On your **Tencent Cloud server** (101.42.231.188):

```bash
# Switch to appuser
sudo su - appuser
cd /opt/django-react-starter

# Pull the latest changes
git pull origin main

# Stop containers
docker compose -f docker-compose.prod.yml down

# Rebuild with the new configuration
./deploy.sh start
```

**Note**: The `deploy.sh start` command will:
1. Build the Docker image (which includes building the React frontend)
2. Extract the frontend dist files to `./frontend/dist/` on the host
3. Start all containers
4. Nginx will mount and serve files from `./frontend/dist/`

### Step 3: Verify the Fix
1. Open http://101.42.231.188 in your browser
2. Press **Ctrl+Shift+R** (or Cmd+Shift+R on Mac) to force reload and clear cache
3. The React app should now load properly! ✨

## What Changed

### Docker Compose (docker-compose.prod.yml)
**Before:**
```yaml
nginx:
  volumes:
    - ./backend/staticfiles:/home/app/backend/staticfiles:ro
    # Missing: frontend dist mount!
```

**After:**
```yaml
nginx:
  volumes:
    - ./backend/staticfiles:/home/app/backend/staticfiles:ro
    - ./frontend/dist:/home/app/backend/frontend/dist:ro  # NEW: Mount frontend dist
```

### Nginx Configuration (nginx/conf.d/default.conf)
**Before:**
```nginx
location /static/ {
    alias /home/app/backend/staticfiles/;  # Wrong! This is for Django
}

location / {
    proxy_pass http://django;  # Django was serving React app
}
```

**After:**
```nginx
location /static/ {
    alias /home/app/backend/frontend/dist/static/;  # Correct: React assets
}

location /django-static/ {
    alias /home/app/backend/staticfiles/;  # Django admin assets
}

location / {
    root /home/app/backend/frontend/dist;  # nginx serves React app
    try_files $uri $uri/ /index.html;     # SPA routing
}
```

### Deploy Script (deploy.sh)
Added automatic frontend extraction:
```bash
# Extract frontend dist files
print_info "Extracting frontend files from Docker image..."
chmod +x extract-frontend.sh
./extract-frontend.sh
```

### New Script (extract-frontend.sh)
```bash
#!/bin/bash
# Extracts frontend dist from Docker image to ./frontend/dist/ on host
CONTAINER_ID=$(docker create django_react_starter_api:prod)
docker cp $CONTAINER_ID:/home/app/backend/frontend/dist/. ./frontend/dist/
docker rm $CONTAINER_ID
```

## How It Works

1. **Build Phase**:
   - Frontend is built inside Docker image during `docker build`
   - React/Vite creates `/home/app/backend/frontend/dist/` with all static files

2. **Extract Phase** (NEW):
   - `extract-frontend.sh` creates a temporary container
   - Copies `/home/app/backend/frontend/dist/` from container to host at `./frontend/dist/`
   - This makes files accessible outside the container

3. **Runtime Phase**:
   - nginx container mounts `./frontend/dist/` from host
   - nginx serves files directly (better performance than proxying)
   - React app loads with all static assets

## Benefits
1. ✅ **Correct File Access**: nginx can read frontend files from host mount
2. ✅ **Better Performance**: nginx serves static files directly (no Django proxy)
3. ✅ **SPA Support**: Client-side routing works with `try_files`
4. ✅ **Separation**: React assets separate from Django admin assets
5. ✅ **Persistent**: Frontend files persist on host, survive container restarts

## Troubleshooting

### If frontend/dist is empty after extraction:
```bash
# Check if files were built in the image
docker run --rm django_react_starter_api:prod ls -la /home/app/backend/frontend/dist/

# If empty, rebuild the image
docker compose -f docker-compose.prod.yml build --no-cache api
./extract-frontend.sh
```

### If page still shows 404 errors:
```bash
# 1. Verify files exist on host
ls -la ./frontend/dist/
ls -la ./frontend/dist/static/

# 2. Check nginx can access them
docker compose -f docker-compose.prod.yml exec nginx ls -la /home/app/backend/frontend/dist/
docker compose -f docker-compose.prod.yml exec nginx ls -la /home/app/backend/frontend/dist/static/

# 3. Check nginx logs
docker compose -f docker-compose.prod.yml logs nginx --tail=50

# 4. Test direct file access
curl http://101.42.231.188/static/index-COiS3hXT.js
```

### If nginx fails to start:
```bash
# Check nginx configuration syntax
docker compose -f docker-compose.prod.yml exec nginx nginx -t

# View nginx error logs
docker compose -f docker-compose.prod.yml logs nginx
```

### Clear browser cache:
- Chrome/Edge: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
- Or use Incognito/Private browsing mode
- Or hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Directory Structure After Fix
```
/opt/django-react-starter/
├── frontend/
│   └── dist/              # ← Extracted from Docker image
│       ├── index.html
│       ├── favicon.ico
│       └── static/        # ← JS and CSS files
│           ├── index-COiS3hXT.js
│           ├── index-CGEkE_ZS.css
│           └── vendor-DavUf6mE.js
├── backend/
│   └── staticfiles/       # ← Django admin static files
├── nginx/
│   └── conf.d/
│       └── default.conf   # ← Updated configuration
├── docker-compose.prod.yml  # ← Updated with volume mount
├── deploy.sh              # ← Updated with extraction step
└── extract-frontend.sh    # ← New extraction script
```

## Note for Django Admin
Django admin static files (CSS, JS for /admin/) are now available at `/django-static/` instead of `/static/`. The Django admin will still work because Django's `STATIC_URL` setting handles this internally.
