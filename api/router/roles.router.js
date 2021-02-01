const passport = require('passport')
const { findAll } = require('../controllers/Role.controller')
const adminRoute = require('../middlewares/adminRoute')

const router = require('express').Router()

router.get('/', [adminRoute, passport.authenticate('jwt', { session: false }) ,findAll])

module.exports = router
