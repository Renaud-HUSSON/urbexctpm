const db = require('../models/Database')
const Category = db.category

//Creates a category in the database
exports.create = (req, res) => {
  //Verify request's body
  if(!req.body.titre){
    return res.status(400).send({
      success: false,
      message: 'Vous devez préciser un titre'
    })
  }

  Category.create({
    titre: req.body.titre
  })
  .then(data => {
    return res.send({
      success: true,
      message: `La catégorie ${data.dataValues.titre} a bien été ajoutée`
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de l'ajout de la catégorie: ${err}`
    })
  })
}

//Retrieves all categories from the database
exports.findAll = (_req, res) => {
  Category.findAll()
  .then(results => {
    return res.send({
      succes: true,
      data: results
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la récupération des catégories: ${err}`
    })
  })
}

//Finds a category by its id
exports.findById = (req, res) => {
  const id = req.params.id

  Category.findOne({
    where: {
      id: id
    }
  })
  .then(results => {
    if(!results){
      return res.status(404).send({
        success: false,
        message: 'La catégorie est introuvable'
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
      message: `Une erreur est survenue lors de la récupération de la catégorie n°${id}: ${err}`
    })
  })
}

//Updates a category
exports.update = (req, res) => {
  const id = req.params.id
  
  //Verify request's body
  if(!req.body.titre){
    return res.status(400).send({
      success: false,
      message: "Le titre doit être donné"
    })
  }

  Category.update(req.body, {
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
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la modification de la catégorie: ${err}`
    })
  })
}

//Deletes one, or manies categories
exports.deleteById = (req, res) => {
  if(!req.query.id){
    return res.status(400).send({
      success: false,
      message: "Vous devez préciser au moins un id"
    })
  }

  const id = req.query.id.split(',')
  
  Category.destroy({
    where: {
      id: id
    }
  })
  .then(() => {
    return res.send({
      success: true,
      message: id.length === 1 ? 'La catégorie a bien été supprimés' : 'Les catégories ont bien été supprimées'
    })
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de la suppresion d'une ou plusieurs catégories: ${err}`
    })
  })
}