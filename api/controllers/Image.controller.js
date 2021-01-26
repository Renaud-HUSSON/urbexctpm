const db = require('../models/Database')
const getContentFromQuery = require('../utils/getContentFromQuery')
const Image = db.images

//Creates an image
exports.create = (req, res) => {
  //Verify request's body
  if(!req.body.titre || !req.body.chemin || !req.body.description || !req.body.categorie){
    return res.status(400).send({
      success: false,
      message: 'Vous devez remplir tous les champs'
    })
  }

  Image.create(req.body)
  .then(data => {
    return res.send({
      success: true,
      message: `L'image ${data.dataValues.titre} a bien été ajoutée`
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de l'ajout de l'image ${data.dataValues.titre}: ${err}`
    })
  })
}

//Retrieves all images
exports.findAll = (req, res) => {
  //Get params from the query to give options to the request
  const filter = req.query.filter
  const fields = req.query.fields
  const order = req.query.order

  const page = req.query.page || 0
  const imagesPerPage = 18

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

  Image.findAll({
    ...options,
    offset: page * imagesPerPage,
    limit: imagesPerPage
  })
  .then(results => {
    return res.send({
      success: true,
      data: results
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la récupération des images: ${err}`
    })
  })
}

//Retrieves a single image by its id
exports.findById = (req, res) => {
  const id = req.params.id

  Image.findOne({
    where: {
      id: id
    }
  })
  .then(results => {
    if(!results){
      return res.status(404).send({
        success: false,
        message: `L'image n°${id} est introuvable`
      })
    }

    return res.send({
      success: true,
      data: results
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la récupération de l'image n°${id}: ${err}`
    })
  })
}

//Updates an image
exports.update = (req, res) => {
  const id = req.params.id
  
  //Verify request's body
  if(!req.body.titre && !req.body.chemin && !req.body.description && !req.body.categorie){
    return res.status(400).send({
      success: false,
      message: 'Vous devez remplir tous les champs'
    })
  }

  Image.update(req.body, {
    where: {
      id: id
    }
  })
  .then(() => {
    return res.send({
      success: true,
      message: "L'image a bien été modifiée"
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la mise à jour de l'image n°${id}: ${err}`
    })
  })
}

//Deletes one or many images
exports.deleteById = (req, res) => {
  if(!req.query.id){
    return res.status(400).send({
      success: false,
      message: 'Vous devez préciser un id'
    })
  }

  const id = req.query.id.split(',')

  Image.destroy({
    where: {
      id: id
    }
  })
  .then(() => {
    return res.send({
      success: true,
      message: id.length === 1 ? "L'image a bien été supprimée" : "Les images ont bien été supprimées"
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la suppresion d'une ou plusieurs images: ${err}`
    })
  })
}