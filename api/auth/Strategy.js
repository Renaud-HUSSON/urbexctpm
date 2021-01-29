const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../models/Database')
const User = db.users

const jwtExtractor = req => {
  if(!req.cookies.access_token){
    return null
  }

  return req.cookies.access_token
}

const options = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: process.env.JWT_SECRET,
}

const verifyCallback = (payload, done) => {
  User.findOne({
    where: {
      id: payload.sub
    }
  })
  .then(user => {
    if(user){
      return done(null, user)
    }

    return done(null, false)
  })
  .catch(err => {
    return done(err, false)
  })

}

const strategy = new JwtStrategy(options, verifyCallback)

module.exports = (passport) => {
  passport.use(strategy)
}


