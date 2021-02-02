const db = require('../models/Database')
const getContentFromQuery = require('../utils/getContentFromQuery')
const Location = db.locations

//Creates a location in the database
exports.create = (req, res) => {
  //Verify request's body
  if(!req.body.title || !req.body.lat || !req.body.lng){
    return res.status(400).send({
      success: false,
      message: 'Vous devez préciser un titre'
    })
  }

  Location.create({
    title: req.body.title,
    lat: req.body.lat,
    lng: req.body.lng
  })
  .then(data => {
    return res.send({
      success: true,
      message: `Le lieu ${data.dataValues.titre} a bien été ajouté`,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de l'ajout du lieu: ${err}`
    })
  })
}

//Retrieves all locations from the database
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
  
  Location.findAndCountAll({
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
      message: `Une erreur est survenue lors de la récupération des lieux: ${err}`
    })
  })
}

//Finds a location by its id
exports.findById = (req, res) => {
  const id = req.params.id

  Location.findOne({
    where: {
      id: id
    }
  })
  .then(results => {
    if(!results){
      return res.status(404).send({
        success: false,
        message: 'Le lieu est introuvable'
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
      message: `Une erreur est survenue lors de la récupération du lieu n°${id}: ${err}`
    })
  })
}

//Updates a location
exports.update = (req, res) => {
  const id = req.params.id
  
  //Verify request's body
  if(!req.body.titre && !req.body.lat && !req.body.lng){
    return res.status(400).send({
      success: false,
      message: "Le titre, la latitude et la longitude doivent être donnés"
    })
  }

  Location.update(req.body, {
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
      message: `Une erreur est survenue lors de la modification du lieu: ${err}`
    })
  })
}

//Deletes one, or manies locations
exports.deleteById = (req, res) => {
  if(!req.query.id){
    return res.status(400).send({
      success: false,
      message: "Vous devez préciser au moins un id"
    })
  }

  const id = req.query.id.split(',')
  
  Location.destroy({
    where: {
      id: id
    }
  })
  .then(() => {
    return res.send({
      success: true,
      message: id.length === 1 ? 'Le lieu a bien été supprimé' : 'Les lieux ont bien été supprimés'
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la suppresion d'un ou plusieurs lieux: ${err}`
    })
  })
}