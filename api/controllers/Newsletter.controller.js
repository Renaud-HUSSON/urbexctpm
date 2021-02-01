const db = require('../models/Database')
const getContentFromQuery = require('../utils/getContentFromQuery')
const Newsletter = db.newsletter

//Creates an email in newsletter's table in the database
exports.create = (req, res) => {
  //Verify request's body
  if(!req.body.email){
    return res.status(400).send({
      success: false,
      message: 'Vous devez préciser un email'
    })
  }

  Newsletter.create({
    email: req.body.email
  })
  .then(data => {
    return res.send({
      success: true,
      message: "L'adresse email a bien été ajoutée",
      data: data
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de l'ajout de l'adresse email': ${err}`
    })
  })
}

//Retrieves all emails from newsletter's table in the database
exports.findAll = (req, res) => {
  //Get params from the query to give options to the request
  const filter = req.query.filter
  const order = req.query.order

  const page = req.query.page - 1 || 0
  const imagesPerPage = 1000

  //Options for the database query
  const options = {}

  if(filter){
    options.where = getContentFromQuery(filter)
  }
  
  if(order){
    options.order = getContentFromQuery(order)
  }
  
  Newsletter.findAndCountAll({
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
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la récupération des adresses email: ${err}`
    })
  })
}

//Finds a newsletter's email by its id
exports.findById = (req, res) => {
  const id = req.params.id

  Newsletter.findOne({
    where: {
      id: id
    }
  })
  .then(results => {
    if(!results){
      return res.status(404).send({
        success: false,
        message: "L'adresse email est introuvable"
      })
    }
    
    return res.send({
      success: true,
      data: results,
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la récupération de l'adresse email n°${id}: ${err}`
    })
  })
}

//Finds a newsletter's email by its email
exports.findByEmail = (req, res) => {
  const email = req.params.email

  Newsletter.findOne({
    where: {
     email: email
    }
  })
  .then(results => {
    if(!results){
      return res.status(404).send({
        success: false,
        message: "L'email est introuvable"
      })
    }
    
    return res.send({
      success: true,
      data: results,
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la récupération de l'adresse email ${email}: ${err}`
    })
  })
}

//Updates an email adresse in the newsletter's table
exports.update = (req, res) => {
  const id = req.params.id
  
  //Verify request's body
  if(!req.body.email){
    return res.status(400).send({
      success: false,
      message: "L'adresse email doit être donné"
    })
  }

  Newsletter.update(req.body, {
    where: {
      id: id
    }
  })
  .then(results => {
    return res.send({
      success: true,
      message: "L'adresse email a bien été modifiée",
      data: {
        id: results
      }
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la modification de l'adresse email: ${err}`
    })
  })
}

//Deletes one, or manies email from the newsletter
exports.deleteById = (req, res) => {
  if(!req.query.id){
    return res.status(400).send({
      success: false,
      message: "Vous devez préciser au moins un id"
    })
  }

  const id = req.query.id.split(',')
  
  Newsletter.destroy({
    where: {
      id: id
    }
  })
  .then(() => {
    return res.send({
      success: true,
      message: id.length === 1 ? "L'adresse email a bien été supprimés" : "Les adresses email ont bien été supprimées"
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la suppresion d'une ou plusieurs adresse email: ${err}`
    })
  })
}