const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findByEmail, create } = require('../controllers/User.controller')
const { generateAccessToken } = require('../utils/generateToken')
const { findByName } = require('../controllers/Role.controller')
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
  
    return res.cookie('access_token', accessToken, {httpOnly: true}).send({
      success: true,
      message: 'Votre compte a bien été créé',
      accessToken: accessToken
    })
  }catch(e){}
})

router.get('/authenticated', async (req, res) => {
  const access_token = req.cookies.access_token
  
  if(!access_token){
    return res.send({
      success: false,
      message: 'Vous devez vous connecter pour accèder à cette ressource'
    })
  }

  try {
    jwt.verify(access_token, process.env.JWT_SECRET)
    
    return res.send({
      success: true
    })  
  }catch(err){
    res.cookie('access_token', '', {maxAge: 0})
    
    return res.send({
      success: false,
      message: `Le JWT est invalide: ${err}`
    })
  }
  
})

router.get('/authorized', (req, res) => {
  const role = req.query.role
  const access_token = req.cookies.access_token

  if(!role){
    return res.status(400).send({
      success: false,
      message: 'Vous devez préciser un role'
    })
  }

  if(!access_token){
    return res.status(403).send({
      success: false,
      message: "Vous n'avez pas le droit d'accèder à cette ressource"
    })
  }

  try {
    const payload = jwt.verify(access_token, process.env.JWT_SECRET)

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
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la vérification du JWT: ${err}`
    })
  }
})

router.get('/logout', (req, res) => {
  return res.cookie('access_token', '', {maxAge: 0}).send({
    success: true,
    message: 'Vous avez été déconnecté avec succès'
  })
})

module.exports = router