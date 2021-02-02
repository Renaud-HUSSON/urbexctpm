const db = require("../models/Database")
const Mailer = require('../models/Mailer')

exports.sendNewsletterMail = (req, res) => {
  const body = req.body.body
  const header = req.body.header

  if(!body || !header){
    return res.status(400).send({
      success: false,
      message: `Une corp et un en-tête doit être fournis pour envoyer le mail`
    })
  }

  return db.newsletter.findAll({
    attributes: ['email']
  })
  .then(data => {
    const emails = data.map(row => row.dataValues.email)

    try {
      for(email of emails){
        Mailer.sendMail(email, header, body)
      }

      return res.send({
        success: true,
        message: 'Les mails ont bien été envoyés'
      })
    }catch(err){
      return res.status(500).send({
        success: false,
        message: `Une erreur est survenue lors de l'evoie des mails: ${err}`
      })
    }
  })
  .catch(err => {
    return res.status(500).send({
      success: false,
      message: `Une erreur est survenue lors de l'envoie des mails: ${err}`
    })
  })

}