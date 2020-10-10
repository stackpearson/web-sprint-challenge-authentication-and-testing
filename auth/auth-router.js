const router = require('express').Router();
const Users = require('./userModel.js');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
const secret = process.send.JWT_SECRET || 'secret stringy thingy';


router.post('/register', async (req, res) => {
  const rounds = process.env.BCRYPT_ROUNDS || 8;

  const creds = req.body
  const hash = bcryptjs.hashSync(creds.password, rounds);
  creds.password = hash;

  try {
    const saved = await Users.add(creds)
    res.status(201).json(saved);
  } catch(err) {
    console.log(err)
    res.status(500).json({error: 'server error', errMsg: err})
  }
});

router.post('/login', async (req, res) => {
  let {username, password} = req.body;

  const [user] = await Users.findBy({username});
  console.log(user)

  try {
      if (user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user)
          res.status(200).json({message: `welcome to the API ${user.username},`, token: token})
      } else {
          res.status(401).json({message: 'you shall not pass'})
      }
  } catch(err) {
      res.status(500).json({message: 'server error'})
  }
})


function generateToken(user) {
  const payload = {
      subject: user.id,
      username: user.username,
      department: user.department
  };

  const secret = process.env.JWT_SECRET || 'secret stringy thingy';
  const options = {
      expiresIn: '1d'
  };

  const token = jwt.sign(payload, secret, options);

  return token;
}

module.exports = router;
