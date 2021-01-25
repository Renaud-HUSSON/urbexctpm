const { create, findAll, findById, update, deleteById } = require('../controllers/Image.controller')

const router = require('express').Router()
const passport = require('passport')

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', passport.authenticate('jwt', { session: false }) ,create)
router.patch('/:id', update)
router.delete('/', deleteById)

module.exports = router