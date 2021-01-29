const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findByEmail, create } = require('../controllers/User.controller')
const { generateAccessToken } = require('../utils/generateToken')

const router = require('express').Router()

router.post('/login', async (req, res) => {
  if(!req.body.email || !req.body.password){
    return res.status(400).send({
      sucess: false,
      message: "Vous devez remplir tous les champs"
    })
  }

  //Fetch the user by its email address
  const result = await findByEmail(req.body.email)

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

  const accessToken = generateAccessToken({sub: result.data.id})

  return res.cookie('access_token', accessToken, {httpOnly: true}).send({
    success: true,
    message: 'Vous êtes bien connecté',
    accessToken: accessToken
  })
})

router.post('/register', async (req, res) => {
  const results = await create(req, res)

  const accessToken = generateAccessToken({sub: results.data})

  return res.cookie('access_token', accessToken, {httpOnly: true}).send({
    success: true,
    message: 'Votre compte a bien été créé',
    accessToken: accessToken
  })
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
    const token = jwt.verify(access_token, process.env.JWT_SECRET)
    console.log(token)
  }catch(err){
    res.cookie('access_token', '', {maxAge: 0})
    
    return res.send({
      success: false,
      message: `Le JWT est invalide: ${err}`
    })
  }
  
  return res.send({
    success: true,
  })  
})

router.get('/logout', (req, res) => {
  return res.cookie('access_token', '', {maxAge: 0}).send()
})

module.exports = router