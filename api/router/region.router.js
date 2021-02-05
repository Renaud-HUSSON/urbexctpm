const { findAll, findById, create, update, deleteById } = require('../controllers/Region.controller')
const { authenticateAdmin } = require('../middlewares/authenticate')

const router = require('express').Router()

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', authenticateAdmin, create)
router.patch('/:id', authenticateAdmin, update)
router.delete('/', authenticateAdmin, deleteById)

module.exports = router