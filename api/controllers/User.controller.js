const db = require('../models/Database')
const bcrypt = require('bcrypt')
const User = db.users

//Creates a user in the database
exports.create = async (req, res) => {
  //verify request's body
  if(!req.body.username || !req.body.email || !req.body.password){
    return res.status(400).send({
      success: false,
      message: "Certains champs sont vides, veuillez les remplir."
    })
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  //Insert the user in the database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })
  .then(() => {
    return res.send({
      success: true,
      message: "Votre compte a bien été créé !"
    })
  })
  .catch(e => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la création de l'utilisateur: ${e}`
    })
  })
}

exports.findAll = (req, res) => {
  //Retrieve all users from the database
  User.findAll()
  .then(results => {
    return res.send({
      success: true,
      data: results
    })
  })
  .catch(e => {
    console.log(`Error while fetching all users: ${e}`)
    res.status(500)
  })
}

//Finds a user by his id
exports.findById = (req, res) => {
  const id = req.params.id
  
  User.findOne({
    where: {
      id: id
    }
  })
  .then(results => {
    return res.send({
      success: true,
      data: results
    })
  })
  .catch(e => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la récupération de l'utilisateur n°${id}: ${e}`
    })
  })
}

//Updates a user 
exports.update = (req, res) => {
  const id = req.params.id

  //Verify that request's body isn't empty
  if(!req.body.username && !req.body.email && !req.body.password){
    return res.status(400).send({
      success: false,
      message: 'Veuillez spécifier au moins un champ à modifier'
    })
  }

  User.update(req.body, {
    where: {
      id: id
    }
  })
  .then((results) => {
    return res.send({
      success: true,
      message: results
    })
  })
  .catch(e => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la mise à jour de informations: ${e}`
    })
  })
}

//Deletes one/many user(s)
exports.deleteById = (req, res) => {
  if(!req.query.id){
    return res.status(400).send({
      success: false,
      message: "Vous devez préciser au moins un id"
    })
  }

  const id = req.query.id.split(',')

  User.destroy({
    where: {
      id: id
    }
  })
  .then(() => {
    return res.send({
      success: true,
      message: id.length === 1 ? 'Votre compte a bien été supprimé' : 'Les comptes ont bien été supprimés'
    })
  })
  .catch(e => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la suppresion d'un ou plusieurs utilisateurs: ${e}`
    })
  })
}

//Finds a user by his username
exports.findByUsername = (username) => {
  User.findOne({
    where: {
      username: username
    }
  })
  .then(results => {
    if(results.length === 0){
      return {
        success: false,
        message: `Aucun utilisateur n'a comme nom d'utilisateur ${username}`
      }
    }
    
    return {
      success: true,
      data: results
    }
  })
  .catch(e => {
    return {
      success: false,
      message: `Une erreur est survenue lors de la récupération de l'utilisateur ${username}: ${e}`
    }
  })
}

//Finds a user by his email
exports.findByEmail = (email) => {
  User.findOne({
    where: {
      email: email
    }
  })
  .then(results => {
    if(results.length === 0){
      return {
        success: false,
        message: `Aucun utilisateur n'a comme nom d'utilisateur ayant comme email ${email}`
      }
    }
    
    return {
      success: true,
      data: results
    }
  })
  .catch(e => {
    return {
      success: false,
      message: `Une erreur est survenue lors de la récupération de l'utilisateur ayant comme email ${email}: ${e}`
    }
  })
}