const router = require('express').Router();
const { findBy, add } = require('./auth-model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secrets = require('../secret')
const { userNameTaken, missing } = require('../middleware/restricted')


router.post('/register', userNameTaken, missing, async (req, res, next) => {
try {
  const { username, password } = req.body;
  const hash = bcryptjs.hashSync(password, 1)
  const newUser = { username, password: hash }
  const result = await add(newUser)
/*   const x = await findBy({username})
  if(username === x.username){
    res.status(422).json({
      message: "Username taken"
    }) */
    /* next({
      status: 422,
      message: "Username taken"
    }) */
 // } else {
 /*    res.status(200).json(result)
  } */next(res.status(200).json(result))
  
} catch(err) {
    next(err)
}
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

/* router.post('/login', missing, (req, res, next) => {
    let { username, password } = req.body;
    console.log(req.body.username, password )
    findBy({ username: req.body.username })
    .then( user  => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = buildToken(user);

        res.status(200).json({ 
          message: `welcome, ${user.username}`,
          token 
          });

    } else {
        res.status(401).json({ message: 'Invalid credentials' })
    }
    })
    .catch(err =>{
      next(err)
      
    })
  }); */
  router.post("/login", missing, (req, res, next) => {
  
      let { username, password } = req.body
  
      findBy({ username })
        .then(([user]) => {
          if (user && bcryptjs.compareSync(password, user.password)) {
            const token = buildToken(user)
            res.status(200).json({ message: `welcome, ${user.username}`, token })
          } else {
            next({ status: 401, message: 'Invalid Credentials' })
          }
        })
        .catch(next)
  });
      /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */


function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secrets.jtwSecret ,options)
}

module.exports = router;
