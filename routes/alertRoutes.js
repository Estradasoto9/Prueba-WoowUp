const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

router.post('/send', alertController.sendAlert); // Send an alert
router.get('/user/:userId', alertController.getAlertsForUser); // Get alerts for specific user
router.get('/topic/:topicId', alertController.getAlertsForTopic); // Get alerts for a specific topic

module.exports = router;
