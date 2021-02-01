const passport = require('passport')
const { findAll, findById, create, update, deleteById } = require('../controllers/Category.controller')
const adminRoute = require('../middlewares/adminRoute')

const router = require('express').Router()

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', [adminRoute, passport.authenticate('jwt', { session: false }), create])
router.patch('/:id', [adminRoute, passport.authenticate('jwt', { session: false }), update])
router.delete('/', [adminRoute, passport.authenticate('jwt', { session: false }), deleteById])

module.exports = router