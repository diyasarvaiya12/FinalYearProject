FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . . 
RUN npm run build

EXPOSE 5173
# Serve the built frontend
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]
