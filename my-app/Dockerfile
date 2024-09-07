# Dockerfile for React app
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json  ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Serve the static files
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port
EXPOSE 5000
