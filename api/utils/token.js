const jwt = require('jsonwebtoken')
const db = require('../models/Database')

/**
 * Verifies a refresh token
 * 
 * @param {String} token - The refresh token we want to verify
 * 
 * @returns The token decoded
 * 
 * @throws if the token is incorrect
 * 
 */
exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, decoded) => {
    if(err) throw new Error("Le token n'est pas valide")

    return decoded
  })
}

/**
 * Generates an access token
 * 
 * @param {Object} data - payload for the JWT 
 * 
 * @returns The jwt
 * 
 */
exports.generateAccessToken = (data) => {
  console.log('DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  console.log(data)
  
  return jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: '3s'
  })
}

/**
 * Generates a refresh token and stores it in the database
 * 
 * @returns The jwt
 * 
 */
exports.generateRefreshToken = (data) => {
  const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: '30d'
  })

  db.refreshTokens.create({
    utilisateurId: data.sub,
    token: refreshToken
  })

  return refreshToken
}

/**
 * Verifies an access token
 * 
 * @param {String} token - The token you want to verify
 * 
 * @returns the token decoded
 * 
 * @throws if the token is incorrect
 * 
 */
exports.verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) throw new Error("Le token n'est pas valide")

    return decoded
  })
}

/**
 * Verifies a refresh token, and creates an access token
 * 
 * @param {String} token - The refresh token you want to verify
 * @param {String} role - The role 
 * 
 * @returns A promise: 
 * - resolves the access token when it the refresh token is correct
 * - rejects if the refresh token is incorrect
 * 
 */
exports.verifyRefreshTokenAndCreateAccessToken = (token, role) => {
  return new Promise(async (resolve, reject) => {
    const verifiedToken = await db.refreshTokens.findOne({
      where: {
        token: token,
      },
      include: [{model: db.users, include: [db.roles]}]
    })
  
    if(!verifiedToken){
      return reject()
    }
    
    if(verifiedToken.dataValues.utilisateur.dataValues.role.dataValues.nom !== role && verifiedToken.dataValues.utilisateur.dataValues.role.dataValues.nom !== 'admin'){
      return reject()
    }
  
    const generatedAccessToken = this.generateAccessToken({
      sub: verifiedToken.dataValues.utilisateur.id,
      role: verifiedToken.dataValues.utilisateur.dataValues.role.dataValues.nom
    })
  
    return resolve(generatedAccessToken)
  })
}