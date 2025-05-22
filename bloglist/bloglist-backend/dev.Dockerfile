FROM node:20.19.2-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV DEBUG=bloglist-backend:*

CMD ["npm", "run", "dev"]