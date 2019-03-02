import * as Fastify from 'fastify'
import {
  FastifyRequest,
  DefaultQuery,
  DefaultParams,
  DefaultHeaders,
  FastifyReply,
  DefaultBody,
} from 'fastify'

import { IncomingMessage, ServerResponse } from 'http'

import fastifyAuth = require('fastify-auth')
import fastifyJWT = require('fastify-jwt')

import { User, getUserByUsername } from'./auth.example'

export default function createServer(opts?: Fastify.ServerOptions) {
  const fastify = Fastify(opts)

  configureSwaggerPlugin(fastify)
  configureAuthPlugin(fastify)

  /* eslint-disable-next-line no-unused-vars */
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  /* eslint-disable-next-line no-unused-vars */
  fastify.get('/twitter', async (request, _reply) => {
    return { twitterHandle: request.query.handle }
  })

  fastify.post('/login', {
    preHandler: fastify.auth([
      verifyUserAndPassword,
    ]),
  /* eslint-disable-next-line no-unused-vars */
  }, async(request, _reply) => {
    return new Promise((res) => {
      // We should be authenticated here...
      fastify.jwt.sign(request.headers['user'], onToken)

      function onToken(err: Error, token: string){
        res({token})
      }
    })
  })

  fastify.get('/checkToken', {
    preHandler: fastify.auth([
      verifyJWT,
    ]),
  /* eslint-disable-next-line no-unused-vars */
  }, async(request, _reply) => {
    // If we are here, then the token is valid
    return {token:'valid'}
  })

  return fastify
}
