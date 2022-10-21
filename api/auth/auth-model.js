const db = require('../../data/dbConfig')

function find() {
  return db('users').select('id', 'username')
}

function findByUsername(filter) {
  return db('users').where('username', filter)
}


function findById(id) {
  return db('users')
    .where({id})
    .first()
}


async function add(user) {
  const [id] = await db('users').insert(user)
  return findById(id)
}

module.exports = {
  find,
  findByUsername,
  add,
  findById
}