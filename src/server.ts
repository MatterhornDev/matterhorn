import * as Fastify from 'fastify'

export default function createServer(opts?: Fastify.ServerOptions) {
  const fastify = Fastify(opts)

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/twitter', async (request, reply) => {
    return { twitterHandle: request.query.handle }
  })

  return fastify
}
