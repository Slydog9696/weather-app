# Step 1: Use an official Node.js base image for version 22.6.0
FROM node:22.6.0-alpine

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy the source code
COPY ./src ./src

# Step 4: Install a simple HTTP server globally
RUN npm install -g http-server

# Step 5: Expose the port for the app
EXPOSE 8080

# Step 6: Start the HTTP server to serve the app on port 8080
CMD ["http-server", "src", "-p", "8080"]