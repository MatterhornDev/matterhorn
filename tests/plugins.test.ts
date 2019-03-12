import createServer from '../src/server'

test('should return swager page on /documentation', () => {
  const fastify = createServer()

  fastify.ready(async () => {
    try {
      const response = await fastify.inject({ method: 'GET', url: '/documentation/static/index.html' })
      expect(response.statusCode).toEqual(200)
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
