# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose backend port
EXPOSE 4000

# Start the server
CMD ["node", "--experimental-modules", "server.js"]
