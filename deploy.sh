#!/bin/bash

# Đặt tên cho image
IMAGE_NAME="tsp-user"

# Build Docker image
docker build -t $IMAGE_NAME .

# Xoá container cũ (nếu có) và tạo container mới để sao chép file
CONTAINER_ID=$(docker create $IMAGE_NAME)

# Sao chép file từ container ra thư mục bên ngoài
docker cp $CONTAINER_ID:/public/tsp-user ~/public/tsp-user

# Xoá container tạm thời
docker rm $CONTAINER_ID

echo "Build complete and files copied to ~/public/tsp-user"
