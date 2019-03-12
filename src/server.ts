import * as Fastify from 'fastify'
import { configureSwaggerPlugin } from './plugins'

export default function createServer(opts?: Fastify.ServerOptions) {
  const fastify = Fastify(opts)

  configureSwaggerPlugin(fastify)

  /* eslint-disable-next-line no-unused-vars */
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  /* eslint-disable-next-line no-unused-vars */
  fastify.get('/twitter', async (request, _reply) => {
    return { twitterHandle: request.query.handle }
  })

  return fastify
}
