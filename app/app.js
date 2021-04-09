const log = require('pino')({ level: 'info' })
const path = require('path')
const healthcheck = require('./health')
const fastify = require('fastify')({ logger: log })


// Plugins
// -------

fastify.register(
  require('fastify-helmet')
)

fastify.register(require('point-of-view'), {
  engine: {
    handlebars: require('handlebars')
  },
  root: path.join(__dirname)
})

fastify.register(healthcheck)


// Config & Defaults
// -----------------

const port       = process.env.PORT || '3000'
const host       = process.env.HOST || 'localhost'
const appVersion = process.env.VERSION || require('./../package.json').version
const greeting   = process.env.HELLO_GREETING || 'Hello'
const name       = process.env.HELLO_NAME || 'Welt'
const color      = process.env.HELLO_COLOR || '#ff5757'
const earthColor = process.env.EARTH_COLOR || '#00c2ca'


// Routes
// ------

fastify.get('/', function (req, reply) {
  reply.view('home.hbs', {
		greeting: greeting,
		name: name,
    color: color,
    earthColor: earthColor,
		version: appVersion
	})
})

fastify.get('/fail', function (req, reply) {
  fastify.log('will fail') // Purposely trigger error for demos
})


// Listen Up
// ---------

fastify.listen(port, host, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server listening on ${address}`)
})


// Error Handling
// --------------

async function closeGracefully(signal) {
  log.warn(`Received signal to terminate: ${signal}`)
  await fastify.close()
  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.exit()
}

process.on('SIGINT', closeGracefully)
process.on('SIGTERM', closeGracefully)

process.on('uncaughtException', err => {
  log.error(`Uncaught Exception: ${err.message}`)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  log.error('Unhandled rejection at ', promise, `reason: ${err.message}`)
  process.exit(1)
})