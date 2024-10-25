#!/bin/bash

# Đặt tên cho image
IMAGE_NAME="tsp-user"

# Build Docker image
docker build -t $IMAGE_NAME .

# Tạo container tạm thời để sao chép file
CONTAINER_ID=$(docker create $IMAGE_NAME)

# Sao chép nội dung từ /public/tsp-user trong container ra thư mục ~/public bên ngoài
docker cp $CONTAINER_ID:/public/tsp-user/. ~/public

# Xoá container tạm thời
docker rm $CONTAINER_ID

echo "Build complete and files copied to ~/public"
