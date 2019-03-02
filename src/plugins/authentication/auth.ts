import { 
  FastifyInstance, 
  FastifyRequest, 
  DefaultQuery, 
  DefaultParams, 
  DefaultHeaders, 
  DefaultBody, 
  FastifyReply 
} from 'fastify'
import fastifyAuth = require('fastify-auth')
import fastifyJWT = require('fastify-jwt')
import { IncomingMessage, ServerResponse } from 'http'
import { User, getUserByUsername } from './auth.example'

export function configureAuthPlugin(fastify: FastifyInstance) {
  fastify
    .register(fastifyJWT, { secret: 'supersecret' })
    .register(fastifyAuth)
}

export function verifyJWT(
  this: FastifyInstance,
  request: FastifyRequest<
    IncomingMessage,
    DefaultQuery,
    DefaultParams,
    DefaultHeaders,
    DefaultBody
  >,
  reply: FastifyReply<ServerResponse>,
  done: (error?: Error) => void) {

  if (!request.req.headers['auth']) {
    return done(new Error('Missing token header'))
  }

  const authValue = request.req.headers['auth'] as string

  this.jwt.verify(authValue, onVerify)

  function onVerify(err: Error, decoded: User) {
    if (err) {
      return done(err)
    }
    // Check if the user exists
    const foundUser = getUserByUsername(decoded.username)
    if (foundUser) {
      if (foundUser.password === decoded.password) {
        request.headers['user'] = foundUser
        return done()
      } else {
        return done(new Error('Token not valid'))
      }
    } else {
      return done(new Error('Token not valid'))
    }
  }
}

export function verifyUserAndPassword(
  request: FastifyRequest<
    IncomingMessage,
    DefaultQuery,
    DefaultParams,
    DefaultHeaders,
    DefaultBody
  >,
  reply: FastifyReply<ServerResponse>,
  done: (error?: Error) => void) {
  const userBody = request.body as User
  // Check if the user exists
  const foundUser = getUserByUsername(userBody.username)
  if (foundUser) {
    if (foundUser.password === userBody.password) {
      request.headers['user'] = foundUser
      return done()
    } else {
      return done(new Error('Invalid user'))
    }
  } else {
    return done(new Error('Invalid user'))
  }
}
