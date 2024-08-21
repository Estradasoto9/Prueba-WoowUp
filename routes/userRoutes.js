const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/add', userController.addUser);
router.post('/:userId/subscribe/:topicId', userController.subscribeToTopic);

module.exports = router;
