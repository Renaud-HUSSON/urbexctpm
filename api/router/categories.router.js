const passport = require('passport')
const { findAll, findById, create, update, deleteById } = require('../controllers/Category.controller')

const router = require('express').Router()

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', passport.authenticate('jwt', { session: false }), create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), update)
router.delete('/', passport.authenticate('jwt', { session: false }), deleteById)

module.exports = router