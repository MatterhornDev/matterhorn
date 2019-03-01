import * as FastifySwagger from 'fastify-swagger' 
import * as Fastify from 'fastify'

export  function configureSwagger(fastifyInstance: Fastify.FastifyInstance ) {
    
  fastifyInstance.register(FastifySwagger, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'MatterHorn Test swagger',
        description: 'testing the fastify swagger api',
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

} 
