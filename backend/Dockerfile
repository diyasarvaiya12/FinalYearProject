# Use lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy rest of the application
COPY . .

# Expose backend port
EXPOSE 4000

# Install PM2 globally & start server
RUN npm install -g pm2
CMD ["pm2-runtime", "server.js"]
