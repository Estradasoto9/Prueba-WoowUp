class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.topics = new Set();
        this.alerts = [];
    }

    subscribeTopic(topic) {
        this.topics.add(topic);
    }

    receiveAlert(alert) {
        this.alerts.push(alert);
    }

    markAlertAsRead(alert) {
        alert.markAsRead();
    }

    getUnreadAlerts() {
        return this.alerts
            .filter(alert => !alert.isRead && !alert.isExpired())
            .sort((a, b) => b.isUrgent - a.isUrgent || b.timestamp - a.timestamp);
    }
}

module.exports = User;