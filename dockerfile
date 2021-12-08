FROM node:latest

WORKDIR /urs/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","init"]
