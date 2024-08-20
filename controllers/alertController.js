const User = require('../models/user');
const Topic = require('../models/topic');
const { InformativeAlert, UrgentAlert } = require('../models/alert');

class AlertController {
    constructor() {
        this.users = new Map();
        this.topics = new Map();
    }

    registerUser(id, name) {
        if (!this.users.has(id)) {
            const user = new User(id, name);
            this.users.set(id, user);
        }
    }

    registerTopic(topicName) {
        if (!this.topics.has(topicName)) {
            const topic = new Topic(topicName);
            this.topics.set(topicName, topic);
        }
    }

    subscribeUserToTopic(userId, topicName) {
        const user = this.users.get(userId);
        const topic = this.topics.get(topicName);
        if (user && topic) {
            user.subscribeTopic(topic);
        }
    }

    sendAlertToTopic(topicName, alert) {
        const topic = this.topics.get(topicName);
        if (topic) {
            this.users.forEach(user => {
                if (user.topics.has(topic)) {
                    user.receiveAlert(alert);
                }
            });
        }
    }

    sendAlertToUser(userId, alert) {
        const user = this.users.get(userId);
        if (user) {
            user.receiveAlert(alert);
        }
    }

    getUnreadAlertsForUser(userId) {
        const user = this.users.get(userId);
        return user ? user.getUnreadAlerts() : [];
    }

    getAlertsForTopic(topicName) {
        const topic = this.topics.get(topicName);
        if (topic) {
            const alerts = [];
            this.users.forEach(user => {
                if (user.topics.has(topic)) {
                    user.alerts.forEach(alert => {
                        if (!alert.isExpired()) {
                            alerts.push({ alert, userSpecific: alert.userSpecific });
                        }
                    });
                }
            });

            return alerts.sort((a, b) => b.alert.isUrgent - a.alert.isUrgent || b.alert.timestamp - a.alert.timestamp);
        }
        return [];
    }
}

module.exports = AlertController;
