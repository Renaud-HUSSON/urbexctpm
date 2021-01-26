const jwt = require('jsonwebtoken')

exports.generateAccessToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '600s'
  })
}