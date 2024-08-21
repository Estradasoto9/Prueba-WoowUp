const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/topicController');

const controller = new TopicController();

// Register topic
router.post('/add', (req, res) => controller.registerTopic(req, res));

// Get active alerts for a topic
router.get('/:topicId/active-alerts', (req, res) => controller.getActiveAlertsForTopic(req, res));

module.exports = router;
