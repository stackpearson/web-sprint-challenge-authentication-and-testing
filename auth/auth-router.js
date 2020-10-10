const router = require('express').Router();
const Users = require('./userModel.js');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
const authenticate = require('../auth/authenticate-middleware.js')
const {jwtSecret} = require('../config/secrets.js');

router.get('/', (req, res) => {
  res.status(200).json({message: 'auth router up'})
})

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcryptjs.hashSync(user.password, 8)

  user.password = hash;
  Users.add(user)
    .then((userRes) => {
      res.status(201).json(userRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
  .first()
  .then((user) => {
    if (user && bcryptjs.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({message: `welcome ${user.username}`, token});

    } else {
      res.status(404).json({message: 'user does not exist'})
    }
  })
  .catch((err) => {
    res.status(500).json({err})
  })
})


function generateToken(user) {
  const payload = {
      subject: user.id,
      username: user.username,
      lat: Date.now()
  };

  // const secret = process.env.JWT_SECRET || 'secret stringy thingy';
  const options = {
      expiresIn: '1d'
  };

  const token = jwt.sign(payload, jwtSecret, options);

  return token;
}

module.exports = router;
