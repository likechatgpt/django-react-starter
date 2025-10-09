#!/bin/bash
set -e

echo "Copying frontend dist files to shared volume..."

# If the volume is empty or doesn't have index.html, copy files
if [ ! -f /home/app/backend/frontend/dist/index.html ]; then
    echo "Frontend dist not found in volume, copying from image..."
    # Copy from a temp location where we'll store the original build
    if [ -d /home/app/frontend-build ]; then
        cp -r /home/app/frontend-build/* /home/app/backend/frontend/dist/
        echo "Frontend files copied successfully!"
    else
        echo "WARNING: Frontend build directory not found!"
    fi
else
    echo "Frontend dist already exists in volume, skipping copy."
fi

# Execute the original command
exec "$@"
