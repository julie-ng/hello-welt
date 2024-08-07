'use strict'

const packageJson = require('./../package.json')

function humanUptime (ms) {
	const uptime = ms/1000
	const days = Math.floor(uptime / 60 / 60 / 24)
	const hours = Math.floor(uptime / 60 / 60) - (days * 24)
	const minutes = Math.floor(uptime / 60) - (hours * 60)
	const seconds = uptime % 60
	return `${days} days, ${hours} hours, ${minutes} minutes, ${Math.floor(seconds)} seconds`
}

// For details about IETF draft standard for health checks, see
// - text fornat: https://tools.ietf.org/html/draft-inadarei-api-health-check-05
// - html format: https://inadarei.github.io/rfc-healthcheck/
function plugin (fastify, options, done) {
	fastify.get('/healthz', (request, reply) => {
		const uptimeMs =   Math.floor(process.uptime()*1000)
		const response = {
			status: 'pass',
			version: packageJson.version,
			description: packageJson.description,
			env: {
				port: process.env.PORT,
				host: process.env.HOST,
				appVersion: process.env.VERSION,
				greeting: process.env.HELLO_GREETING,
				name: process.env.HELLO_NAME,
				color: process.env.HELLO_COLOR,
				earthColor: process.env.EARTH_COLOR
			},
			checks: {
				uptime: [{
					component_type: 'system',
					observed_value: uptimeMs,
					observed_unit: 'ms',
					human_readable: humanUptime(uptimeMs),
					current_time: (new Date()).toUTCString()
				}]
			},
			links: {
				github: "https://github.com/julie-ng/hello-welt"
			}
		}

    reply.send(response)
  })

  done()
}

module.exports = plugin