FROM node:20.19.4-alpine3.22

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=todo-backend:*

USER node

CMD npm start