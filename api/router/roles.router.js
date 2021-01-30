const passport = require('passport')
const { findAll } = require('../controllers/Role.controller')

const router = require('express').Router()

router.get('/', passport.authenticate('jwt', { session: false }) ,findAll)

module.exports = router
