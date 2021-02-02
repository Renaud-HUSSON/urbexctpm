const router = require('express').Router()
const { findAll, findById, create, update, deleteById } = require('../controllers/User.controller')
const { authenticateAdmin, authenticateUser } = require('../middlewares/authenticate')

router.get('/', authenticateAdmin, findAll)
router.get('/:id', authenticateAdmin, findById)
router.post('/', () => {
  create()

  return res.send({
    success: true,
    message: "Votre compte a bien été créé !"
  })
})
router.patch('/:id', authenticateUser, update)
router.delete('/', authenticateUser, deleteById)

module.exports = router