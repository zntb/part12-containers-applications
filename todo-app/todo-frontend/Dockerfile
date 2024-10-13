FROM node:20

WORKDIR /usr/src/app

# Copy package.json and lock files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Set VITE_BACKEND_URL for the build process
ENV VITE_BACKEND_URL="http://localhost:3000/"

# Copy the rest of the application
COPY . .

# Build the frontend
RUN npm run build

# Install a lightweight static server to serve the built files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Serve the application
CMD ["serve", "-s", "dist", "-l", "3000"]
