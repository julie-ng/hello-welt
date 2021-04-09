'use strict'

const tap = require('tap')
const buildFastify = require('./../app/app')

tap.test('GET `/` route', (t) => {
  const fastify = buildFastify()
  const markup = '<a href="https://github.com/julie-ng/hello-welt">View Source on GitHub</a>'

  t.plan(3)
  t.teardown(() => fastify.close())
  fastify.inject({ method: 'GET', url: '/' }, (err, response) => {
    t.equal(response.statusCode, 200)
    t.equal(response.headers['content-type'], 'text/html; charset=utf-8')
    t.equal(response.payload.includes(markup), true)
  })
})

tap.test('GET `/fail` route', (t) => {
  const fastify = buildFastify()

  t.plan(3)
  t.teardown(() => fastify.close())
  fastify.inject({ method: 'GET', url: '/fail' }, (err, response) => {
    t.equal(JSON.parse(response.payload).message, 'app.log is not a function')
    t.equal(response.statusCode, 500)
    t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
  })
})

tap.test('GET `/health` route', (t) => {
  const fastify = buildFastify()
  const packageJson = require('./../package.json')

  t.plan(5)
  t.teardown(() => fastify.close())
  fastify.inject({ method: 'GET', url: '/health' }, (err, response) => {
    t.equal(JSON.parse(response.payload).status, 'pass')
    t.equal(JSON.parse(response.payload).version, packageJson.version)
    t.equal(JSON.parse(response.payload).description, packageJson.description)
    t.equal(response.statusCode, 200)
    t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
  })
})
