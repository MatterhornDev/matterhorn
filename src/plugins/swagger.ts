import * as FastifySwagger from 'fastify-swagger' 
import { FastifyInstance } from 'fastify'

export function configureSwaggerPlugin(fastifyInstance: FastifyInstance) {
  fastifyInstance.register(FastifySwagger, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Matterhorn Test swagger',
        description: 'Testing the fastify swagger api',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'code', description: 'Code related end-points' }
      ],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    },
    exposeRoute: true
  })

  // Fastify Swagger Test URI demonstration i.e. sample Path. 
  fastifyInstance.post('/user/:id', {
    schema: {
      description: 'user Creation API',
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
  }, async (request, reply) => {
    return reply.code(201).send({
      message: request.body.user.name + ' - Successfully Created',
      status: 'success',
      username: request.body.user.name
    })
  })
}
