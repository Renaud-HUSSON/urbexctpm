const JwtStrategy = require('passport-jwt').Strategy
const db = require('../models/Database')
const User = db.users

var role

const jwtExtractor = req => {
  role = req.headers.role ? req.headers.role : ''
  
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
  const where = {
    id: payload.sub
  }
  
  if(role !== ''){
    where['$role.nom$'] = role
  }
  
  console.log(where)
  
  User.findOne({
    where: where,
    include: [db.roles]
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


