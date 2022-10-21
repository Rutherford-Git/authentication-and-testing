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
  }, 750)
  test('[2]', async ()=>{
    const res = await request(server).post('/api/auth/register').send({ username: '', password: '1234' })
    expect(res.body.message).toMatch(/username and password required/)
  }, 750)
})

describe('./login endpoint', ()=>{
  test('[3]', async ()=>{
    const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '1234' })
    expect(res.body.message).toMatch(/welcome, foo/)
})
  test('[3]', async ()=>{
    const res = await request(server).post('/api/auth/login').send({ username: 'foo', password: '' })
    expect(res.body.message).toMatch(/username and password required/)
  })
})