// Show alerts to the user
class AlertView {
    showUnreadAlerts(alerts) {
        alerts.forEach(alert => {
            console.log(`Alert: ${alert.message}, Urgent: ${alert.isUrgent}, Expiration: ${alert.expirationDate}`);
        });
    }
}

module.exports = AlertView;
