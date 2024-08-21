class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.subscribedTopics = new Set();
        this.alerts = []; // list of alerts
    }

    subscribeToTopic(topicId) {
        this.subscribedTopics.add(topicId);
    }

    unsubscribeFromTopic(topicId) {
        this.subscribedTopics.delete(topicId);
    }

    receiveAlert(alert) {
        this.alerts.push(alert);
    }

    markAlertAsRead(alertId) {
        const alert = this.alerts.find(alert => alert.id === alertId);
        if (alert) alert.read = true;
    }

    getUnreadAlerts() {
        const now = new Date();
        return this.alerts
            .filter(alert => !alert.read && alert.expirationDate > now)
            .sort((a, b) => a.type === 'Urgent' ? -1 : (b.type === 'Urgent' ? 1 : 0));
    }
}

module.exports = User;
