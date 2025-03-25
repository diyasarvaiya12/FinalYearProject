# Use lightweight Node.js
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=production

# Install PM2 globally
RUN npm install -g pm2

COPY . .

EXPOSE 4000

# Start backend with PM2
CMD ["pm2-runtime", "start", "server.js", "--name", "backend"]
