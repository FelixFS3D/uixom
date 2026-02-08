FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

EXPOSE 5005

ENV NODE_ENV=production

CMD ["node", "server.js"]
