class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.subscribedTopics = new Set();
        this.alerts = [];
    }

    subscribeToTopic(topic) {
        this.subscribedTopics.add(topic);
    }

    unsubscribeFromTopic(topic) {
        this.subscribedTopics.delete(topic);
    }

    receiveAlert(alert) {
        if (!alert.hasOwnProperty('id') || !alert.hasOwnProperty('expiryDate')) {
            throw new Error('Invalid alert object');
        }
        alert.read = alert.read || false;
        this.alerts.push(alert);
    }

    markAlertAsRead(alertId) {
        const alert = this.alerts.find(alert => alert.id === alertId);
        if (alert) {
            alert.read = true;
        } else {
            throw new Error('Alert not found');
        }
    }

    getUnreadAlerts() {
        const now = new Date();
        return this.alerts.filter(alert => !alert.read && alert.expiryDate > now);
    }
}

module.exports = User;
