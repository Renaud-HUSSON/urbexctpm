const { sendNewsletterMail } = require('../controllers/Mailer.controller')
const { findAll, findById, create, update, deleteById } = require('../controllers/Newsletter.controller')
const { authenticateAdmin } = require('../middlewares/authenticate')

const router = require('express').Router()

router.get('/', authenticateAdmin, findAll)
router.get('/:id', authenticateAdmin, findById)
router.post('/', create)
router.post('/send', authenticateAdmin, sendNewsletterMail)
router.patch('/:id', authenticateAdmin, update)
router.delete('/', deleteById)

module.exports = router