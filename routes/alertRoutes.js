const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

router.post('/createAlert', (req, res) => {alertController.createAlert(req, res); // create and send alerts
});

router.get('/user/:userId', (req, res) => {alertController.getAlertsForUser(req, res); // get user alerts by id
});

router.get('/topic/:topicId', (req, res) => {alertController.getAlertsForTopic(req, res); // get topical alerts by id
});

module.exports = router;
