FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npm ci && npm run build

EXPOSE 5173
CMD ["npm", "start"]
