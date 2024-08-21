const express = require('express');
const router = express.Router();
const AlertController = require('../controllers/alertController');

const controller = new AlertController();

// send alert
router.post('/send', (req, res) => controller.sendAlert(req, res));

module.exports = router;
