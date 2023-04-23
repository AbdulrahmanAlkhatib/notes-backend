const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const authentication = require('../utils/authentication')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const correctPass = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(correctPass && user)) {
    res.status(401).json({
      error: 'invalid password or username',
    })
  }

  const token = authentication.sign(user)

  /* const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET,
    { expiresIn: 60*60 }
  ) */


  res.status(200).json({
    token,
    username: user.username,
    name: user.name,
  })

})

module.exports = loginRouter