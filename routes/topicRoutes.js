const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.post('/add', topicController.addTopic);
router.get('/:topicId', topicController.getTopic);

module.exports = router;
