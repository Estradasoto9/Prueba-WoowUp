const User = require('../models/user');

class UserService {
    constructor() {
        this.users = new Map();
    }

    createUser(id, name) {
        const user = new User(id, name);
        this.users.set(id, user);
        return user;
    }

    subscribeToTopic(userId, topicId) {
        const user = this.users.get(userId);
        if (user) {
            user.subscribeToTopic(topicId);
        }
    }

    unsubscribeFromTopic(userId, topicId) {
        const user = this.users.get(userId);
        if (user) {
            user.unsubscribeFromTopic(topicId);
        }
    }

    markAlertAsRead(userId, alertId) {
        const user = this.users.get(userId);
        if (user) {
            user.markAlertAsRead(alertId);
        }
    }

    getUnreadAlerts(userId) {
        const user = this.users.get(userId);
        if (user) {
            return user.getUnreadAlerts();
        }
        return [];
    }

    getUserById(userId) {
        return this.users.get(userId);
    }

    getAllUsers() {
        return Array.from(this.users.values());
    }
}

module.exports = new UserService();
