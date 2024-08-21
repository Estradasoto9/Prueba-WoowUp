const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.post('/add', topicController.addTopic); // Create a new topic
router.get('/:topicId', topicController.getTopic); // Get a topic by id

module.exports = router;
