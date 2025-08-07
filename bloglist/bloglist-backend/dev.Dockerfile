FROM node:20.19.4-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV DEBUG=bloglist-backend:*

CMD ["npm", "run", "dev"]