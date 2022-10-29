var express = require('express');
var router = express.Router();

/* GET users listing. */

// http handlers from userController
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');
router.post('/signup',authController.signup);
router.post('/login', authController.login);
router.post('/saveFinishedLessonData',dataController.saveFinishedLessonData);
router.get('/sectionsData',dataController.sectionsData);

module.exports = router;
