#!/bin/bash

# Pull code mới nhất từ GitHub
git pull origin main

# Build Docker image
docker build -t tsp_user .

# Create a temporary container to copy files
docker create --name temp-container my-react-app
docker cp temp-container:/app/dist ~/public/user
docker rm temp-container

