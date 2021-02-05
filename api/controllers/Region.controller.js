const db = require('../models/Database')
const getContentFromQuery = require('../utils/getContentFromQuery')
const Region = db.regions

//Creates a region in the database
exports.create = (req, res) => {
  //Verify request's body
  if(!req.body.nom){
    return res.status(400).send({
      success: false,
      message: 'Vous devez préciser un nom pour la région'
    })
  }

  Region.create({
    nom: req.body.nom
  })
  .then(data => {
    return res.send({
      success: true,
      message: `La région ${data.dataValues.nom} a bien été ajoutée`,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de l'ajout de la région: ${err}`
    })
  })
}

//Retrieves all regions from the database
exports.findAll = (req, res) => {
  //Get params from the query to give options to the request
  const filter = req.query.filter
  const fields = req.query.fields
  const order = req.query.order

  const page = req.query.page - 1 || 0
  const imagesPerPage = 1000

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
  
  Region.findAndCountAll({
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
      message: `Une erreur est survenue lors de la récupération des régions: ${err}`
    })
  })
}

//Finds a region by its id
exports.findById = (req, res) => {
  const id = req.params.id

  Region.findOne({
    where: {
      id: id
    }
  })
  .then(results => {
    if(!results){
      return res.status(404).send({
        success: false,
        message: 'La région est introuvable'
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
      message: `Une erreur est survenue lors de la récupération de la région n°${id}: ${err}`
    })
  })
}

//Updates a region
exports.update = (req, res) => {
  const id = req.params.id
  
  //Verify request's body
  if(!req.body.nom){
    return res.status(400).send({
      success: false,
      message: "Un nom doit être donné"
    })
  }

  Region.update(req.body, {
    where: {
      id: id
    }
  })
  .then(results => {
    return res.send({
      success: true,
      message: 'Les informations ont bien été modifiées',
      data: {
        id: results
      }
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la modification de la région: ${err}`
    })
  })
}

//Deletes one, or manies regions
exports.deleteById = (req, res) => {
  if(!req.query.id){
    return res.status(400).send({
      success: false,
      message: "Vous devez préciser au moins un id"
    })
  }

  const id = req.query.id.split(',')
  
  Region.destroy({
    where: {
      id: id
    }
  })
  .then(() => {
    return res.send({
      success: true,
      message: id.length === 1 ? 'La région a bien été supprimés' : 'Les régions ont bien été supprimées'
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la suppresion d'une ou plusieurs région: ${err}`
    })
  })
}