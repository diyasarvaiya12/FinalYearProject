FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npm ci && npm run build

EXPOSE 5174
CMD ["npm", "start"]
