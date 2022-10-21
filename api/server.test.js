// Write your tests here
const require = require('supertest')
const request = require('./server')
const server = require('./server')
const router = require('./auth/auth-router')
test('sanity', () => {
  expect(true).toBe(true)
})

describe('./register endpoint', ()=>{
  test('[1]', ()=>{
    return request(router).post('/login')
  })
  test('[2]', ()=>{})
})

describe('./login endpoint', ()=>{
  test('[3]', ()=>{})
  test('[3]', ()=>{})
})