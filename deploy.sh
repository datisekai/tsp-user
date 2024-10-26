#!/bin/bash
git pull
# Đặt tên cho image
IMAGE_NAME="tsp-user"

# Build Docker image
docker build -t $IMAGE_NAME .

# Tạo container tạm thời để sao chép file
CONTAINER_ID=$(docker create $IMAGE_NAME)

rm -rf /var/www/html/tsp-user

# Sao chép nội dung từ /public/tsp-user trong container ra thư mục ~/public bên ngoài
docker cp $CONTAINER_ID:/public/tsp-user /var/www/html/tsp-user

# Xoá container tạm thời
docker rm $CONTAINER_ID

echo "Build complete and files copied to /var/www/html/tsp-user"
