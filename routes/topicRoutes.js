const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.post('/create', (req, res) => {topicController.createTopic(req, res); // register new topic
});

router.get('/:id', (req, res) => {topicController.getTopic(req, res); // get topics by id
});

module.exports = router;
