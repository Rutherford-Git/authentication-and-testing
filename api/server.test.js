// Write your tests here
const request = require('supertest')
const router = require('./auth/auth-router')

const server = require('../api/server')
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')
//const jwtDecode = require('jwt-decode')

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
  })
  test('[2]', async ()=>{
    const res = await request(server).post('/api/auth/register').send({ username: 'foo', password: '' })
    expect(res.status).toBe(422)
  })
})

describe('./login endpoint', ()=>{
  test('[3]', ()=>{})
  test('[3]', ()=>{})
})