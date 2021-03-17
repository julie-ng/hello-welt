// Fastify & Plugins

const path = require('path')
const fastify = require('fastify')({
  logger: true
})

fastify.register(
  require('fastify-helmet')
)

fastify.register(require('point-of-view'), {
  engine: {
    handlebars: require('handlebars')
  },
  root: path.join(__dirname)
})

// Config & Defaults

const port       = process.env.PORT || '3000'
const appVersion = process.env.VERSION || require('./../package.json').version
const greeting   = process.env.HELLO_GREETING || 'Hello'
const name       = process.env.HELLO_NAME || 'Welt'
const color      = process.env.HELLO_COLOR || '#ff5757'
const earthColor = process.env.EARTH_COLOR || '#57ffd1'

// Route

fastify.get('/', function (req, reply) {
  reply.view('home.hbs', {
		greeting: greeting,
		name: name,
    color: color,
    earthColor: earthColor,
		version: appVersion
	})
})

// Listen Up

fastify.listen(port, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server listening on ${address}`)
})