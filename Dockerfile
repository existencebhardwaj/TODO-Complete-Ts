# Use an official Node runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Change to the backend directory
WORKDIR /usr/src/app/src/backend

# Expose the port your backend is running on
EXPOSE 8000

# Build the TypeScript code
RUN npm run build

# Switch back to the root directory
WORKDIR /usr/src/app

# Install frontend dependencies
RUN npm install --prefix src/frontend

# Build the React app
RUN npm run build --prefix src/frontend

# Expose the port for the React frontend
EXPOSE 3000

# Start both the backend and frontend
CMD ["npm", "start"]
