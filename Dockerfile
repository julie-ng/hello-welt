FROM node:lts-alpine
RUN apk add dumb-init

ENV NODE_ENV production
ENV HOST '0.0.0.0'

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm ci --only=production

USER node
CMD ["dumb-init", "node", "app/server.js"]