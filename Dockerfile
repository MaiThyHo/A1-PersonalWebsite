# Dockerfile (Nginx Static Site Server)
FROM nginx:alpine

# Copy all files into Nginx public HTML directory
COPY . /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 80

# Nginx will automatically serve index.html