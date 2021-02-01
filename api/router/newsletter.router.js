const passport = require('passport')
const { findAll, findById, create, update, deleteById } = require('../controllers/Newsletter.controller')
const adminRoute = require('../middlewares/adminRoute')

const router = require('express').Router()

router.get('/', [adminRoute, passport.authenticate('jwt', { session: false }), findAll])
router.get('/:id', [adminRoute, passport.authenticate('jwt', { session: false }), findById])
router.post('/', create)
router.patch('/:id', [adminRoute, passport.authenticate('jwt', { session: false }), update])
router.delete('/', deleteById)

module.exports = router