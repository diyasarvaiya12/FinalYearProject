FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npm ci --omit=dev

EXPOSE 4000
CMD ["node", "server.js"]
