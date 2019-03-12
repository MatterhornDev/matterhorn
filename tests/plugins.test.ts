import createServer from '../src/server'

test('should return swagger page on /documentation', async () => {
  const fastify = createServer()

  try {
    const response = await fastify.inject({ method: 'GET', url: '/documentation/static/index.html' })
    expect(response.statusCode).toEqual(200)
  } catch (error) {
    expect(error).toBeFalsy()
  }
})
