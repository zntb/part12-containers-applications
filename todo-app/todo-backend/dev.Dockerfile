FROM node:20.9.0-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV DEBUG=todo-backend:*

CMD ["npm", "run", "dev"]