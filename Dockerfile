FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

FROM ubuntu:20.04 As compiler

RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

FROM node:18-alpine As production

COPY --from=compiler /usr/bin/gcc /usr/bin/gcc
COPY --from=compiler /usr/bin/g++ /usr/bin/g++

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/data ./data
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/server.js" ]