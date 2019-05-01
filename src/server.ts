import * as Fastify from 'fastify'
import { configureAuthPlugin, configureSwaggerPlugin } from './plugins'

export default function createServer(opts?: Fastify.ServerOptions) {
  const fastify = Fastify(opts)

  configureSwaggerPlugin(fastify)
  configureAuthPlugin(fastify)

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  fastify.get('/twitter', async (request, _reply) => {
    return { twitterHandle: request.query.handle }
  })

  return fastify
}
