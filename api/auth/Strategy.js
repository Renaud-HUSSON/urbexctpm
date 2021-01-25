const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../models/Database')
const User = db.users

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const verifyCallback = (payload, done) => {
  console.log(payload)
  
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


