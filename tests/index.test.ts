import createServer from '../src/server'

const fastify = createServer()

afterAll(() => fastify.close(() => null))

test('should return hello world', async () => {
  try {
    const response = await fastify.inject({ method: 'GET', url: '/' })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.payload)).toEqual({ hello: 'world' })
  } catch (error) {
    expect(error).toBeFalsy()
  }
})

test('should return twitter handle', async () => {
  const handle = '@ArrowoodTech'
  try {
    const response = await fastify.inject({ method: 'GET', url: `/twitter?handle=${handle}` })
    expect(JSON.parse(response.payload)).toEqual({ twitterHandle: handle })
  } catch (error) {
    expect(error).toBeFalsy()
  }
})
