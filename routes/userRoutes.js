const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', (req, res) => {userController.createUser(req, res); // register new user
});

router.post('/subscribe', (req, res) => {userController.subscribeToTopic(req, res); // subscribe to a new topic
});

router.post('/unsubscribe', (req, res) => {userController.unsubscribeFromTopic(req, res); // unsubscribe to a topic
});

router.post('/markAlertAsRead', (req, res) => {userController.markAlertAsRead(req, res); // mark alert as read
});

router.get('/alerts/:userId', (req, res) => {userController.getUnreadAlerts(req, res); // get all unread alerts
});

module.exports = router;
