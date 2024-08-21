const userService = require('../services/userService');

class UserController {
    createUser(req, res) {
        const { id, name } = req.body;
        const user = userService.createUser(id, name);
        res.json(user);
    }

    subscribeToTopic(req, res) {
        const { userId, topicId } = req.body;
        userService.subscribeToTopic(userId, topicId);
        res.json({ message: 'New topic subscribed' });
    }

    unsubscribeFromTopic(req, res) {
        const { userId, topicId } = req.body;
        userService.unsubscribeFromTopic(userId, topicId);
        res.sendStatus(200);
    }

    markAlertAsRead(req, res) {
        const { userId, alertId } = req.body;
        userService.markAlertAsRead(userId, alertId);
        res.sendStatus(200);
    }

    getUnreadAlerts(req, res) {
        const { userId } = req.params;
        const alerts = userService.getUnreadAlerts(userId);
        res.json(alerts);
    }
}

module.exports = new UserController();
