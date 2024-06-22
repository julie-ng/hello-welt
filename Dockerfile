FROM node:20.15.1-alpine3.20
RUN apk add dumb-init

ENV NODE_ENV production
ENV HOST '0.0.0.0'

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm ci --only=production

USER node
CMD ["dumb-init", "node", "app/server.js"]