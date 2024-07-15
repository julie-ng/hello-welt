'use strict'

const path = require('path')
const healthcheck = require('./health')
const helmet = require('@fastify/helmet')
const fastify = require('fastify')

// --- Config ---

const appVersion = process.env.VERSION || require('./../package.json').version
const greeting   = process.env.HELLO_GREETING || 'Hello'
const name       = process.env.HELLO_NAME || 'Welt'
const color      = process.env.HELLO_COLOR || '#ff5757'
const earthColor = process.env.EARTH_COLOR || '#00c2ca'

module.exports = function (opts = {}) {
  const app = fastify(opts)

  // --- Plugins ---

  app.register(helmet)
  app.register(healthcheck)
  app.register(require('@fastify/view'), {
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

  app.get('/requestz', function (req, reply) {
    const res =  {
      requestId: req.id,
      hostname: req.hostname,
      url: req.url,
      query: req.query,
      params: req.params,
      ip: req.ip,
      ips: req.ips,
      routeOptions: req.routeOptions,
      headers: req.headers,
      body: req.body
    }
    return res
  })

  app.get('/failz', function (req, reply) {
    // Purposely trigger error for demos
    // app.log function does not exist.
    app.log('will fail')
  })

  app.get('/crashz', function (req, reply) {
    process.exit(1)
  })

  app.get('/slowz', async function (req, reply) {
    function setCallback () {
      const data = {
        counter: 0,
        hugeString: new Array(10000000).join('x')
      }

      return function cb () {
        data.counter++ // data object is now part of the callback's scope
        console.log(data.counter) // intentionally pollute logs
      }
    }

    setInterval(setCallback(), 100) // can't stop this 🫠

    reply.send({
      status: 'pass',
      message: 'Warning: this path intentionally creates a memory leak! Please use only for testing and demo purposes.'
    })
  })

  return app
}
