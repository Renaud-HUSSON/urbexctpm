const router = require('express').Router()
const { findAll, findById, create, update, deleteById } = require('../controllers/User.controller')

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', create)
router.patch('/:id', update)
router.delete('/', deleteById)

module.exports = router