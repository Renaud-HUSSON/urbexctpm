const router = require('express').Router()
const passport = require('passport')
const { findAll, findById, create, update, deleteById } = require('../controllers/User.controller')
const adminRoute = require('../middlewares/adminRoute')

router.get('/', [adminRoute, passport.authenticate('jwt', { session: false }), findAll])
router.get('/:id', [adminRoute, passport.authenticate('jwt', { session: false }), findById])
router.post('/', passport.authenticate('jwt', { session: false }), () => {
  create()

  return res.send({
    success: true,
    message: "Votre compte a bien été créé !"
  })
})
router.patch('/:id', passport.authenticate('jwt', { session: false }), update)
router.delete('/', [adminRoute, passport.authenticate('jwt', { session: false }), deleteById])

module.exports = router