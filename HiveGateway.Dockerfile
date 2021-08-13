FROM node:16-alpine

ARG BUILD_ENV=github


RUN apk update && apk add openssl

WORKDIR /app

COPY . . 

RUN npm install

RUN cd packages/backends/ && npm i

RUN npx lerna bootstrap --scope @hexhive-backends/gateway --include-dependencies

ENV NODE_ENV="production"


CMD ["npx", "lerna", "start", "--scope", "@hexhive-backends/gateway"]