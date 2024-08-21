const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/add', userController.addUser); // Create a new user
router.post('/:userId/subscribe/:topicId', userController.subscribeToTopic); // Subscribe to a topic

module.exports = router;
