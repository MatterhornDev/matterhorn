import { FastifyInstance } from 'fastify'
import * as fastifyJWT from 'fastify-jwt'

export function configureAuthPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyJWT, { secret: 'supersecret' })

  fastify.post('/auth/issueToken', (request, reply) => {
    const token = fastify.jwt.sign({ payload: request.body.user })
    reply.send({ token })
  })

  fastify.post('/auth/checkToken', (request, reply) => {
    const verified = fastify.jwt.verify(request.body.token)
    reply.send({ verified })
  })

  fastify.get('/auth/protectedRoute', {
    preValidation: async (request, reply, done) => {
      try {
        await request.jwtVerify()
        done()
      } catch (err) {
        reply.send(err)
      }
    }
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  }, async (request, reply) => {
    return { foo: 'bar' }
  })
}
