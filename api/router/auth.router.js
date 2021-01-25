const bcrypt = require('bcrypt')
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

  return res.send({
    success: true,
    message: 'Vous êtes bien connecté',
    accessToken: accessToken
  })
})

router.post('/register', async (req, res) => {
  const results = await create(req, res)

  const accessToken = generateAccessToken({sub: results.data})

  return res.send({
    success: true,
    message: 'Votre compte a bien été créé',
    accessToken: accessToken
  })
})

module.exports = router