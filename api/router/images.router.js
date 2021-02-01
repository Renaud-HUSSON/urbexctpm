const multer  = require('multer')()

const { create, findAll, findById, update, deleteById } = require('../controllers/Image.controller')

const router = require('express').Router()
const passport = require('passport')
const { deleteImage } = require('../utils/images')

router.get('/', findAll)
router.get('/:id', findById)
router.post('/', [adminRoute, passport.authenticate('jwt', { session: false }), create])
router.patch('/:id', [adminRoute, passport.authenticate('jwt', { session: false }), update])
router.delete('/', [adminRoute, passport.authenticate('jwt', { session: false }), deleteById])

module.exports = router