const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User.model')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKeyProvider: process.env.JWT_SECRET,
}

const strategy = new JwtStrategy(options, (payload, done) => {
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

})

module.exports = (passport) => {
  passport.use(strategy)
}


