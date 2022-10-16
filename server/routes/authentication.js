var express = require('express');
var router = express.Router();

/* GET users listing. */

// http handlers from userController
const authController = require('../controllers/authController')

router.post('/signup',authController.signup);
router.post('/login', authController.login);

module.exports = router;
