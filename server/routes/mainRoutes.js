var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');
router.post('/signup',authController.signup);
router.post('/login', authController.login);
router.post('/saveFinishedLessonData',dataController.saveFinishedLessonData);
router.get('/sectionsData',dataController.sectionsData);

// these are POST requests only because in order to get user mistakes, the UID is needed, which gets sent in the POST request
router.post('/getUserMistakes',dataController.getUserMistakes);
router.post('/getUsersScore',dataController.getUsersScore);
router.post('/updateDailyStreak',dataController.updateDailyStreak);
router.post('/getDailyStreak',dataController.getDailyStreak);
router.post('/getUserPoints',dataController.getUserPoints);
router.post('/buyPerk',dataController.buyPerk);

module.exports = router;
