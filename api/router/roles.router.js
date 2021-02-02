const { findAll } = require('../controllers/Role.controller')
const { authenticateAdmin } = require('../middlewares/authenticate')

const router = require('express').Router()

router.get('/', authenticateAdmin, findAll)

module.exports = router
