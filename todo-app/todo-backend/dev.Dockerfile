FROM node:20.19.0-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV DEBUG=todo-backend:*

CMD ["npm", "run", "dev"]