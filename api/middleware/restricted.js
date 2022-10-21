const jwt = require('jsonwebtoken')
const secrets = require('../secret')

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
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */

module.exports ={
  restricted
};
