const express = require('express')
const path = require('path')
const multer = require('multer') 
const router = express.Router()
const bodyParser = require('body-parser')
const userController = require('../controllers/user.controller')
const cookieParser = require('cookie-parser');
const authCheck = require('../middlewares/authentication')



router.use(bodyParser.json())
router.use(cookieParser())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.static('public'))



const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename : function(req, file, cb){
        const name = Date.now() + '-' + file.originalname
        cb(null, name);
    }
})

const upload = multer({storage : storage})

router.get('/register', userController.register)
router.post('/register', upload.single('image'), userController.registerUser)
router.get('/login', userController.login)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logout)

module.exports = router;

