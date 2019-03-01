import * as Fastify from 'fastify'
import { configureSwagger } from './plugins'

export default function createServer(opts?: Fastify.ServerOptions) {
  const fastify = Fastify(opts)

  configureSwagger(fastify) 

  /* eslint-disable-next-line no-unused-vars */
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  /* eslint-disable-next-line no-unused-vars */
  fastify.get('/twitter', async (request, _reply) => {
    return { twitterHandle: request.query.handle }
  })

  // Fastify Swagger Test URI demonstration i.e. sample Path. 
  fastify.post('/user/:id', {
    schema: {
      description: 'post some data',
      tags: ['user'],
      summary: 'A User Creation API',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'user id'
          }
        }
      },
      body: {
        type: 'object',
        properties: {
          comments: { type: 'string' },
          user: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              password: { type: 'string' }
            }
          }
        }
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            message: { type: 'string' },
            status: { type: 'string' },
            username: { type: 'string' },
          }
        }
      },
      security: [
        {
          'apiKey': []
        }
      ]
    }
  }, (req, reply) => {
   
    return reply.code(201).send({
      message: req.body.user.name + ' - Successfully Created',
      status: 'success',
      username: req.body.user.name
    })

  })

  return fastify
}
