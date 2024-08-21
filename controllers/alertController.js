const alertService = require('../services/alertService');

class AlertController {
    createAlert(req, res) {
        try {
            const { id, type, message, topicId, userId, expirationDate } = req.body;
            if (userId) {
                alertService.createAlertForUser(id, type, message, topicId, userId, new Date(expirationDate));
            } else {
                alertService.createAlertForTopic(id, type, message, topicId, new Date(expirationDate));
            }
            res.json({ message: 'Alert created and sent' });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    getAlertsForUser(req, res) {
        const { userId } = req.params;
        const alerts = alertService.getAlertsForUser(parseInt(userId, 10));
        res.json(alerts);
    }

    getAlertsForTopic(req, res) {
        const { topicId } = req.params;
        const alerts = alertService.getAlertsForTopic(parseInt(topicId, 10));
        res.json(alerts);
    }
}

module.exports = new AlertController();
