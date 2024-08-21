const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const controller = new UserController();

// Register user
router.post('/add', (req, res) => controller.registerUser(req, res));

// Subscribe user to topic
router.post('/:userId/subscribe', (req, res) => controller.subscribeUserToTopic(req, res));

// Unsubscribe user from topic
router.post('/:userId/unsubscribe', (req, res) => controller.unsubscribeUserFromTopic(req, res));

// Mark alert as read
router.post('/:userId/alerts/:alertId/read', (req, res) => controller.markAlertAsRead(req, res));

// Get unread alerts from a user
router.get('/:userId/unread-alerts', (req, res) => controller.getUnreadAlertsForUser(req, res));

module.exports = router;
