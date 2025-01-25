const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat.controller')
const authenticate = require('../middleware/auth')

router.get('/connects', authenticate, chatController.getConnects)

module.exports = router;