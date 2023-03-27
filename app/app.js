'use strict'

const path = require('path')
const healthcheck = require('./health')
const helmet = require('fastify-helmet')
const fastify = require('fastify')

// --- Config ---

const appVersion = process.env.VERSION || require('./../package.json').version
const greeting   = process.env.HELLO_GREETING || 'Hello'
const name       = process.env.HELLO_NAME || 'Welt'
const color      = process.env.HELLO_COLOR || '#ff5757'
const earthColor = process.env.EARTH_COLOR || '#00c2ca'

module.exports = function (opts ={}) {
  const app = fastify(opts)

  // --- Plugins ---

  app.register(helmet)
  app.register(healthcheck)
  app.register(require('point-of-view'), {
    engine: {
      handlebars: require('handlebars')
    },
    root: path.join(__dirname)
  })

  // --- Routes ---

  app.get('/', function (req, reply) {
    reply.view('home.hbs', {
      greeting: greeting,
      name: name,
      color: color,
      earthColor: earthColor,
      version: appVersion
    })
  })

  app.get('/fail', function (req, reply) {
    // Purposely trigger error for demos
    // app.log function does not exist.
    app.log('will fail')
  })

  return app
}
