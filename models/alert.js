class Alert {
    constructor(id, type, topicId, userId, message, timestamp, expiration) {
        this.id = id;
        this.type = type; // 'Urgent' or 'Informative'
        this.topicId = topicId;
        this.userId = userId; // null for all users
        this.message = message;
        this.expirationDate = expirationDate; // Alert expiration date
        this.read = false;
    }

    isExpired() {
        return this.expirationDate < Date.now();
    }
}

module.exports = Alert;
