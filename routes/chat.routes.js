const express = require('express')
const router = express.Router()
const authCheck = require('../middlewares/authentication')
const chatController = require('../controllers/chat.controller')



router.get('/connects', authCheck(), chatController.getConnects)


module.exports = router;