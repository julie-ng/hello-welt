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

const appVersion = process.env.VERSION || require('./../package.json').version
const greeting = process.env.HELLO_GREETING || 'Hallo'
const name = process.env.HELLO_NAME || 'Welt'

// Declare a route
fastify.get('/', function (req, reply) {
  reply.view('home.hbs', {
		greeting: greeting,
		name: name,
		version: appVersion
	})
})

// Listen
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server listening on ${address}`)
})