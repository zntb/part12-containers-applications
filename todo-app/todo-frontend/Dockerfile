FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL="http://localhost:8080/api/"

RUN npm run test

RUN npm run build

FROM nginx:1.28.0-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html



