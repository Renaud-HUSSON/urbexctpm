const db = require('../models/Database')
const getContentFromQuery = require('../utils/getContentFromQuery')
const Carousel = db.carousel

//Creates an image for the carousel in the database
exports.create = (req, res) => {
  //Verify request's body
  if(!req.body.imageId){
    return res.status(400).send({
      success: false,
      message: 'Vous devez préciser une image'
    })
  }

  Carousel.create({
    imageId: req.body.imageId
  })
  .then(data => {
    return res.send({
      success: true,
      message: `L'image ${data.dataValues.imageId} a bien été ajoutée`,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de l'ajout de l'image: ${err}`
    })
  })
}

//Retrieves all carousel images from the database
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
  
  Carousel.findAndCountAll({
    ...options,
    offset: page * imagesPerPage,
    limit: imagesPerPage,
    include: [db.images]
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
      message: `Une erreur est survenue lors de la récupération des catégories: ${err}`
    })
  })
}

//Finds a carousel image by its id
exports.findById = (req, res) => {
  const id = req.params.id

  Carousel.findOne({
    where: {
      id: id
    },
    include: [db.images]
  })
  .then(results => {
    if(!results){
      return res.status(404).send({
        success: false,
        message: 'L\'image du carousel est introuvable'
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
      message: `Une erreur est survenue lors de la récupération de l'image du carousel n°${id}: ${err}`
    })
  })
}

//Updates a carousel image
exports.update = (req, res) => {
  const id = req.params.id
  
  //Verify request's body
  if(!req.body.imageId){
    return res.status(400).send({
      success: false,
      message: "L'image doit être donné"
    })
  }

  Carousel.update(req.body, {
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
      message: `Une erreur est survenue lors de la modification de l'image: ${err}`
    })
  })
}

//Deletes one, or manies carousel image
exports.deleteById = (req, res) => {
  if(!req.query.id){
    return res.status(400).send({
      success: false,
      message: "Vous devez préciser au moins un id"
    })
  }

  const id = req.query.id.split(',')
  
  Carousel.destroy({
    where: {
      id: id
    }
  })
  .then(() => {
    return res.send({
      success: true,
      message: id.length === 1 ? 'L\'image a bien été supprimée du carousel' : 'Les images ont bien été supprimées du carousel'
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la suppresion d'une ou plusieurs images du carousel: ${err}`
    })
  })
}