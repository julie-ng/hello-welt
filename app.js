const fastify = require('fastify')({
  logger: true
})

fastify.register(
  require('fastify-helmet')
)

fastify.register(require('point-of-view'), {
  engine: {
    handlebars: require('handlebars')
  }
})

// Defaults

const greeting = process.env.HELLO_GREETING || 'Hallo'
const name = process.env.HELLO_NAME || 'Welt'

// Declare a route
fastify.get('/', function (req, reply) {
  reply.view('./home.hbs', {
		greeting: greeting,
		name: name,
		version: require('./package.json').version
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