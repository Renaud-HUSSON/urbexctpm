const passport = require('passport')
const { sendNewsletterMail } = require('../controllers/Mailer.controller')
const { findAll, findById, create, update, deleteById } = require('../controllers/Newsletter.controller')
const adminRoute = require('../middlewares/adminRoute')

const router = require('express').Router()

router.get('/', [adminRoute, passport.authenticate('jwt', { session: false }), findAll])
router.get('/:id', [adminRoute, passport.authenticate('jwt', { session: false }), findById])
router.post('/', create)
router.post('/send', [adminRoute, passport.authenticate('jwt', { session: false }), sendNewsletterMail])
router.patch('/:id', [adminRoute, passport.authenticate('jwt', { session: false }), update])
router.delete('/', deleteById)

module.exports = router