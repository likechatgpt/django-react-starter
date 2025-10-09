#!/bin/bash

echo "=== Diagnostic Script for Static Files Issue ==="
echo ""

echo "1. Checking if frontend dist files exist in nginx container:"
docker compose -f docker-compose.prod.yml exec nginx ls -la /home/app/backend/frontend/dist/ 2>&1 || echo "ERROR: Cannot access directory"
echo ""

echo "2. Checking if static subdirectory exists:"
docker compose -f docker-compose.prod.yml exec nginx ls -la /home/app/backend/frontend/dist/static/ 2>&1 || echo "ERROR: Cannot access static directory"
echo ""

echo "3. Checking nginx configuration:"
docker compose -f docker-compose.prod.yml exec nginx cat /etc/nginx/conf.d/default.conf | grep -A 3 "location /static/"
echo ""

echo "4. Testing nginx configuration syntax:"
docker compose -f docker-compose.prod.yml exec nginx nginx -t
echo ""

echo "5. Checking nginx error logs (last 20 lines):"
docker compose -f docker-compose.prod.yml logs nginx --tail=20
echo ""

echo "6. Checking if files are mounted in api container:"
docker compose -f docker-compose.prod.yml exec api ls -la /home/app/backend/frontend/dist/static/ 2>&1 || echo "ERROR: Cannot access in api container"
echo ""

echo "=== End of Diagnostics ==="
