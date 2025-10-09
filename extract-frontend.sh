#!/bin/bash

# Extract frontend dist from the Docker image to host filesystem
# This script should be run after building the api image

set -e

echo "Extracting frontend dist files from Docker image..."

# Create temporary container from the image
CONTAINER_ID=$(docker create django_react_starter_api:prod)

echo "Created temporary container: $CONTAINER_ID"

# Create frontend/dist directory if it doesn't exist
mkdir -p ./frontend/dist

# Copy files from container to host
docker cp $CONTAINER_ID:/home/app/backend/frontend/dist/. ./frontend/dist/

# Remove temporary container
docker rm $CONTAINER_ID

echo "Frontend files extracted successfully to ./frontend/dist/"
echo "Contents:"
ls -la ./frontend/dist/
