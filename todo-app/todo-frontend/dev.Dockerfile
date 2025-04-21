FROM node:20.19.0-bookworm-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]
