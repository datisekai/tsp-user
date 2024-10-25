# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code to the working directory
COPY . .

# Build the Vite React application
RUN npm run build

# Stage 2: Serve the built files using a lightweight web server
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 4173 instead of the default port 80
EXPOSE 4173

# Update Nginx configuration (if needed) or expose correct port in docker-compose
CMD ["nginx", "-g", "daemon off;"]
