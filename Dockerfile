FROM node:16-alpine as bot
WORKDIR /app
COPY package*.json ./
RUN npm i --legacy-peer-deps
COPY . .
CMD ["npm", "start"]