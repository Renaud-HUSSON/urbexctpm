const router = require('express').Router()
const passport = require('passport')
const { findAll, findById, create, update, deleteById } = require('../controllers/User.controller')

router.get('/', passport.authenticate('jwt', { session: false }), findAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), findById)
router.post('/', passport.authenticate('jwt', { session: false }), create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), update)
router.delete('/', passport.authenticate('jwt', { session: false }), deleteById)

module.exports = router