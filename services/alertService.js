class AlertService {
    constructor() {
        this.alerts = [];
        this.topics = new Map(); // To map topic IDs to subscribed users
    }

    addTopic(topicId) {
        if (!this.topics.has(topicId)) {
            this.topics.set(topicId, new Set());
        }
    }

    subscribeUserToTopic(topicId, userId) {
        if (this.topics.has(topicId)) {
            this.topics.get(topicId).add(userId);
        }
    }

    createAlertForUser(id, type, message, topicId, userId, expirationDate) {
        const alert = { id, type, message, topicId, userId, expirationDate };
        this.alerts.push(alert);
    }

    createAlertForTopic(id, type, message, topicId, expirationDate) {
        if (this.topics.has(topicId)) {
            const userIds = Array.from(this.topics.get(topicId));
            userIds.forEach(userId => {
                const alert = { id, type, message, topicId, userId, expirationDate };
                this.alerts.push(alert);
            });
        }
    }

    getAlertsForUser(userId) {
        // Filter alerts for the user or for the topic the user is subscribed to
        const filteredAlerts = this.alerts.filter(alert => alert.userId === userId || alert.userId === null);

        // Sort alerts: Urgent first (LIFO) then Informational (FIFO)
        const urgentAlerts = filteredAlerts.filter(alert => alert.type === 'Urgent');
        const informativeAlerts = filteredAlerts.filter(alert => alert.type === 'Informative');

        // Urgent in LIFO order (last-in-first-out)
        const sortedUrgentAlerts = urgentAlerts.reverse();

        // Information in FIFO order (first-in-first-out)
        const sortedInformativeAlerts = informativeAlerts;

        return sortedUrgentAlerts.concat(sortedInformativeAlerts);
    }

    getAlertsForTopic(topicId) {
        const filteredAlerts = this.alerts.filter(alert => alert.topicId === topicId);

        const urgentAlerts = filteredAlerts.filter(alert => alert.type === 'Urgent');
        const informativeAlerts = filteredAlerts.filter(alert => alert.type === 'Informative');
        const sortedUrgentAlerts = urgentAlerts.reverse();

        const sortedInformativeAlerts = informativeAlerts;

        return sortedUrgentAlerts.concat(sortedInformativeAlerts);
    }
}

module.exports = new AlertService();
