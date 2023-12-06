FROM node:21.4.0-alpine AS react_upstream

WORKDIR /app/frontend

COPY --link package.json package-lock.json ./

RUN npm install

COPY --link . ./

EXPOSE 63281