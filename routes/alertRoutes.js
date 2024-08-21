const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

router.post('/send', alertController.sendAlert);
router.get('/user/:userId', alertController.getAlertsForUser);
router.get('/topic/:topicId', alertController.getAlertsForTopic);

module.exports = router;
