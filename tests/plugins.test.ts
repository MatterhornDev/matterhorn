import createServer from '../src/server'

const fastify = createServer()

afterAll(() => fastify.close(() => null))

test('should return swagger page on /documentation', async () => {
  try {
    const response = await fastify.inject({ method: 'GET', url: '/documentation/static/index.html' })
    expect(response.statusCode).toEqual(200)
  } catch (error) {
    expect(error).toBeFalsy()
  }
})

test('should issue token based on payload', async () => {
  const payload = { user: 'Matterhorn' }

  try {
    const response = await fastify.inject({ method: 'POST', url: '/auth/issueToken', payload})
    const token = JSON.parse(response.payload)['token']
    expect(token).not.toBeNull()
  } catch (error) {
    expect(error).toBeFalsy()
  }
})
