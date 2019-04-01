import createServer from '../src/server'

const fastify = createServer()

afterAll(() => fastify.close(() => null))

describe('should test fastify-swagger plugin', () => {
  test('should return swagger page on /documentation', async () => {
    try {
      const response = await fastify.inject({ method: 'GET', url: '/documentation/static/index.html' })
      expect(response.statusCode).toEqual(200)
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})

describe('should test fastify-jwt plugin', () => {
  test('should issue and use valid token based on payload', async () => {
    try {
      let response = await fastify.inject({
        method: 'POST',
        url: '/auth/issueToken',
        payload: {
          user: 'Matterhorn'
        }
      })
  
      const token = JSON.parse(response.payload)['token']
      expect(token).not.toBeNull()
  
      response = await fastify.inject({
        method: 'POST',
        url: '/auth/checkToken',
        payload: {
          token
        }
      })
      const verified = JSON.parse(response.payload)['verified']
      expect(verified).toBeTruthy()
  
      response = await fastify.inject({
        method: 'GET',
        url: '/auth/protectedRoute',
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      expect(JSON.parse(response.payload)).toMatchObject({ foo: 'bar' })
  
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
