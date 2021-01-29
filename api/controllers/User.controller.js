const db = require('../models/Database')
const bcrypt = require('bcrypt')
const getContentFromQuery = require('../utils/getContentFromQuery')
const User = db.users

//Creates a user in the database
exports.create = async (req, res) => {
  //verify request's body
  if(!req.body.email || !req.body.password || !req.body.username){
    return res.status(400).send({
      sucess: false,
      message: "Vous devez remplir tous les champs"
    })
  }

  const userByEmail = await this.findByEmail(req.body.email)

  if(userByEmail.success){
    return res.status(409).send({
      success: false,
      message: "Cet email est déjà pris"
    })
  }

  const userByUsername = await this.findByUsername(req.body.username)

  if(userByUsername.success){
    return res.status(409).send({
      success: false,
      message: "Ce nom d'utilisateur est déjà pris"
    })
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  //Insert the user in the database
  return User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })
  .then(data => {
    return {
      success: true,
      message: "Votre compte a bien été créé !",
      data: data.dataValues.id
    }
  })
  .catch(e => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la création de l'utilisateur: ${e}`
    })
  })
}

exports.findAll = (req, res) => {
  //Get params from the query to give options to the request
  const filter = req.query.filter
  const fields = req.query.fields
  const order = req.query.order

  const page = req.query.page - 1 || 0
  const imagesPerPage = req.query.limit ? parseInt(req.query.limit) : 18

  //Options for the database query
  const options = {}

  if(filter){
    options.where = getContentFromQuery(filter)
  }
  
  if(fields){
    options.attributes = getContentFromQuery(fields)
  }

  if(order){
    options.order = getContentFromQuery(order)
  }
  
  //Retrieve all users from the database
  User.findAndCountAll({
    ...options,
    offset: page * imagesPerPage,
    limit: imagesPerPage
  })
  .then(results => {
    return res.set('Content-Range', `${page * imagesPerPage}-${imagesPerPage * (page + 1) > results.count ? results.count : imagesPerPage * (page + 1)}/${results.count}`).send({
      data: results.rows,
      success: true,
      page: page,
      total: results.count
    })
  })
  .catch(e => {
    res.status(500).send({
      success: false,
      message: `Error while fetching all users: ${e}`
    })
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
    if(!results){
      return res.status(404).send({
        success: false,
        message:"L'utilisateur est introuvable"
      })
    }
    
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
  .then(() => {
    return res.send({
      success: true,
      message: 'Les informations ont bien été modifiées'
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
  return new Promise(resolve => {
    User.findOne({
      where: {
        username: username
      }
    })
    .then(results => {
      if(results.length === 0){
        resolve({
          success: false,
          message: `Aucun utilisateur n'a comme nom d'utilisateur ${username}`
        })
      }
      
      resolve({
        success: true,
        data: results
      })
    })
    .catch(e => {
      resolve({
        success: false,
        message: `Une erreur est survenue lors de la récupération de l'utilisateur ${username}: ${e}`
      })
    })
  })
}

//Finds a user by his email
exports.findByEmail = (email) => {
  return new Promise(resolve => {
    User.findOne({
      where: {
        email: email
      }
    })
    .then(results => {
      if(!results){
        resolve({
          success: false,
          message: `Le compte ayant pour adresse email ${email} n'existe pas`
        })
      }
      
      resolve({
        success: true,
        data: results
      })
    })
    .catch(e => {
      resolve({
        success: false,
        message: `Une erreur est survenue lors de la récupération de l'utilisateur ayant comme email ${email}: ${e}`
      })
    })
  })
}