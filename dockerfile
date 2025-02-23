FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

# RUN npm run dev

COPY . .

RUN npm run build

FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=build /app/dist .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]