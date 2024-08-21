class Alert {
    constructor(id, type, topic, expiryDate, user = null) {
        this.id = id;
        this.type = type; // 'informative' or 'urgent'
        this.topic = topic;
        this.expiryDate = expiryDate; // Alert expiration date
        this.user = user;
        this.timestamp = new Date(); // Date alert created
        this.read = false;
    }
}

module.exports = Alert;
