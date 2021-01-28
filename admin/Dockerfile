FROM node:14-alpine
WORKDIR /admin
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8082