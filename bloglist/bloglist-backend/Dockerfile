FROM node:20.19.2-bullseye-slim

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=bloglist-backend:*

USER node

CMD npm start