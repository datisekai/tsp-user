#!/bin/bash

# Pull code mới nhất từ GitHub
git pull origin main

# Build lại ứng dụng (ví dụ cho React với Vite)
docker-compose down
docker-compose build
docker-compose up -d
