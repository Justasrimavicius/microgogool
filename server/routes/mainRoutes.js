var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');
router.post('/signup',authController.signup);
router.post('/login', authController.login);
router.post('/saveFinishedLessonData',dataController.saveFinishedLessonData);
router.get('/sectionsData',dataController.sectionsData);

// this is a POST request only because in order to get user mistakes, the UID is needed, which gets sent in the POST request
router.post('/getUserMistakes',dataController.getUserMistakes);

module.exports = router;
