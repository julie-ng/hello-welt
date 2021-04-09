'use strict'

const log = require('pino')({ level: 'info' })
const server = require('./app')({ logger: log })
const port = process.env.PORT || '3000'
const host = process.env.HOST || 'localhost'

// --- Server Listen ---

server.listen(port, host, function (err, address) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  server.log.info(`Server listening on ${address}`)
})


// --- Graceful Shutdown ---

async function closeGracefully (signal) {
  log.warn(`Received signal to terminate: ${signal}`)
  await server.close()
  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.exit()
}

process.on('SIGINT', closeGracefully)
process.on('SIGTERM', closeGracefully)


// --- Handle Errors ---

process.on('uncaughtException', (err) => {
  log.error(`Uncaught Exception: ${err.message}`)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  log.error('Unhandled rejection at ', promise, `reason: ${reason}`)
  process.exit(1)
})
