const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findByEmail, create } = require('../controllers/User.controller')
const { findByName } = require('../controllers/Role.controller')
const { generateRefreshToken, generateAccessToken, verifyRefreshTokenAndCreateAccessToken, verifyAccessToken } = require('../utils/token')
const db = require('../models/Database')
const router = require('express').Router()

router.post('/login', async (req, res) => {
  if(!req.body.email || !req.body.password){
    return res.status(400).send({
      sucess: false,
      message: "Vous devez remplir tous les champs"
    })
  }

  const role = req.query.role || ''

  //Fetch the user by its email address
  const result = await findByEmail(req.body.email, role)

  if(!result.success){
    return res.status(400).send(result)
  }

  //Compare user's password to the provided password
  const isValid = await bcrypt.compare(req.body.password, result.data.password)
  
  if(!isValid){
    return res.status(401).send({
      success: false,
      message: "Le mot de passe est incorrect"
    })
  }

  if(req.body.refresh === true){
    try {
      const refreshToken = generateRefreshToken({sub: result.data.dataValues.id, role: 'user'})
      res.cookie('refresh_token', refreshToken)
    }catch(e){}
  }

  const accessToken = generateAccessToken({sub: result.data.id, role: result.data.role.nom})

  return res.cookie('access_token', accessToken, {httpOnly: true}).send({
    success: true,
    message: 'Vous êtes bien connecté',
    accessToken: accessToken
  })
})

router.post('/register', async (req, res) => {
  const role = await findByName('user')

  if(!role.success){
    return res.status(500).send({
      success: false,
      data: 'Le compte ne peut pas être créé actuellement'
    })
  }

  //Put the roleId in res body to then access it in the controller
  req.body.roleId = role.data
  
  try {
    const results = await create(req, res)
    const accessToken = generateAccessToken({sub: results.data, role: 'user'})

    if(req.body.refresh === true){
      const refreshToken = generateRefreshToken({sub: results.data, role: 'user'})
      res.cookie('refresh_token', refreshToken)
    }
    
    return res.cookie('access_token', accessToken, {httpOnly: true}).send({
      success: true,
      message: 'Votre compte a bien été créé',
      accessToken: accessToken
    })
  }catch(e){}
})

router.get('/authenticated', async (req, res) => {
  const refresh_token = req.cookies.refresh_token
  const access_token = req.cookies.access_token
  
  if(!access_token){
    if(!refresh_token){
      return res.status(403).send({
        success: false,
        message: 'Vous devez vous connecter pour accèder à cette ressource'
      })
    }

    return verifyRefreshTokenAndCreateAccessToken(refresh_token)
    .then(accessToken => {
      return res.cookie('access_token', accessToken).send({success: true})
    })
    .catch(() => {
      return res.status(401).send({
        success: false,
        message: `Veuillez vous reconnecter`
      })
    })
  }else{
    try {
      jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN_SECRET)
      
      return res.send({
        success: true
      })  
    }catch(err){
      res.cookie('access_token', '', {maxAge: 0})
      
      if(refresh_token){
        return verifyRefreshTokenAndCreateAccessToken(refresh_token)
        .then(accessToken => {
          return res.cookie('access_token', accessToken).send({success: true})
        })
        .catch(() => {
          return res.status(401).send({
            success: false,
            message: `Veuillez vous reconnecter`
          })
        })
      }
      
      return res.status(401).send({
        success: false,
        message: `Le JWT est invalide: ${err}`
      })
    }
  }
})

router.get('/authorized', (req, res) => {
  const role = req.query.role
  const access_token = req.cookies.access_token
  const refresh_token = req.cookies.refresh_token

  if(!role){
    return res.status(400).send({
      success: false,
      message: 'Vous devez préciser un role'
    })
  }

  if(!access_token){
    if(!refresh_token){
      return res.status(403).send({
        success: false,
        message: "Vous n'avez pas le droit d'accèder à cette ressource"
      })
    }
    
    return verifyRefreshTokenAndCreateAccessToken(refresh_token)
    .then(accessToken => {
      return res.cookie('access_token', accessToken).send({success: true})
    })
    .catch(() => {
      return res.status(401).send({
        success: false,
        message: "Vous n'avez pas le droit d'accèder à cette ressource"
      })
    })
  }

  try {
    const payload = verifyAccessToken(access_token)

    if(payload.role !== role && payload.role !== 'admin'){
      return res.status(403).send({
        success: false,
        message: "Vous n'avez pas le droit d'accèder à cette ressource"
      })
    }

    return res.send({
      success: true
    })
  }catch(err){
    if(refresh_token){
      return verifyRefreshTokenAndCreateAccessToken(refresh_token)
      .then(accessToken => {
        return res.cookie('access_token', accessToken).send({success: true})
      })
      .catch(() => {
        return res.status(401).send({
          success: false,
          message: "Vous n'avez pas le droit d'accèder à cette ressource"
        })
      })
    }
    
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la vérification du JWT: ${err}`
    })
  }
})

router.get('/logout', (req, res) => {
  //Deletes the refresh token record in the database
  db.refreshTokens.destroy({
    where: {
      token: req.cookies.refresh_token
    }
  })
  .catch(e => {})
  
  res.cookie('refresh_token', '', {maxAge: 0})
  
  return res.cookie('access_token', '', {maxAge: 0}).send({
    success: true,
    message: 'Vous avez été déconnecté avec succès'
  })
})

module.exports = router