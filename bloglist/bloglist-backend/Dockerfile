FROM node:20.9.0-bullseye-slim

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=bloglist-backend:*

USER node

CMD npm start