FROM node:14-alpine AS build
WORKDIR /usr/app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run prisma:generate
RUN npm run build

FROM node:14-alpine
WORKDIR /usr/app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY --from=build /usr/app/dist/ ./
COPY ./prisma/ ./prisma/
RUN npm run prisma:generate
CMD NODE_PORT=$PORT npm run serve