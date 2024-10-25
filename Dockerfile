# Bước 1: Sử dụng Node.js làm base image
FROM node:20 AS builder

# Bước 2: Đặt thư mục làm việc
WORKDIR /app

# Bước 3: Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Bước 4: Cài đặt các dependencies
RUN npm install

# Bước 5: Sao chép toàn bộ mã nguồn vào container
COPY . .

# Bước 6: Chạy lệnh build
RUN npm run build

# Bước 7: Tạo image cho việc sao chép kết quả
FROM alpine:latest

# Bước 8: Tạo thư mục đích để sao chép
RUN mkdir -p /public

# Bước 9: Sao chép build từ bước builder
COPY --from=builder /app/dist /public

# Bước 10: Thiết lập thư mục làm việc
WORKDIR /public
