const { create, findAll, findById, update, deleteById } = require('../controllers/Image.controller')

const router = require('express').Router()
const { authenticateAdmin } = require('../middlewares/authenticate')

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', authenticateAdmin, create)
router.patch('/:id', authenticateAdmin, update)
router.delete('/', authenticateAdmin, deleteById)

module.exports = router