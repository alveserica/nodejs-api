FROM node:19-alpine

RUN apk --no-cache add curl

COPY . /app/

WORKDIR /app

RUN npm install -g nodemon
RUN npm install

COPY . .