const jwt = require('jsonwebtoken')
const secrets = require('../secret')
const { findBy } = require('../auth/auth-model')

function restricted(req, res, next) {
  const token = req.headers.authorization
  console.log(token)
  if(token) {
    jwt.verify(token, secrets.jtwSecret, (err, decoded) =>{
      if(err) {
        next({
          status: 401,
          message: `Token invalid`,
          stack: err.stack
        })
      } else {
       // req.decoded = decoded
        console.log(decoded)
        next()
      }
    } )
  } else {
    next({ status: 401, message: 'Token required'})
  }
}
async function userNameTaken (req, res, next) {
  console.log(req.body)
  const x = await findBy({username: req.body.username})
  console.log(x)
    if(x.length){
        next({
        status: 422,
        message: "Username taken"
      })
    } else {
      next()
    }
}
function missing (req, res, next) {
  if (!req.body.password || !req.body.username) {
    next({
      status: 422,
      message: "username and password required"
    })
  }else {
    next()
  }
}
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */

module.exports ={
  restricted,
  userNameTaken,
  missing
};
