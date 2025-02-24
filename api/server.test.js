const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('./register endpoint', ()=>{
  test('[1]', async ()=>{
    const res = await request(server).post('/api/auth/register').send({ username: 'foo', password: '1234' })
    expect(res.status).toBe(200)
  }, 750)
  test('[2]', async ()=>{
    const res = await request(server).post('/api/auth/register').send({ username: '', password: '1234' })
    expect(res.body.message).toMatch(/username and password required/)
  })
}, 750)

describe('./login endpoint', ()=>{
  test('[3]', async ()=>{
    const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234' })
    expect(res.body.message).toMatch(/welcome, foo/)
}, 750)
  test('[3]', async ()=>{
    const res = await request(server).post('/api/auth/login').send({ username: 'tea', password: '' })
    expect(res.body.message).toMatch(/username and password required/)
  })
}, 750)