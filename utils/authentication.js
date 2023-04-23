const jwt = require('jsonwebtoken')

const authenticate = (token) => {
  const pureToken = (token && token.startsWith('Bearer ')) ? token.replace('Bearer ', '') : null
  const decodedToken = jwt.verify(pureToken, process.env.SECRET)
  return decodedToken.id
}

const sign = (user) => {
  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET,
    { expiresIn: 60*60 }
  )
  return token
}

module.exports = { authenticate, sign }