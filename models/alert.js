class Alert {
    constructor(message, expirationDate, isUrgent = false) {
        this.message = message;
        this.expirationDate = expirationDate;
        this.isRead = false;
        this.isUrgent = isUrgent;
        this.timestamp = new Date();
    }

    markAsRead() {
        this.isRead = true;
    }

    isExpired() {
        return new Date() > this.expirationDate;
    }
}

class InformativeAlert extends Alert {
    constructor(message, expirationDate) {
        super(message, expirationDate, false);
    }
}

class UrgentAlert extends Alert {
    constructor(message, expirationDate) {
        super(message, expirationDate, true);
    }
}

module.exports = { Alert, InformativeAlert, UrgentAlert };
