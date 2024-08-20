const AlertController = require('./controllers/alertController');
const AlertView = require('./views/alertView');
const { InformativeAlert, UrgentAlert } = require('./models/alert');

const alertController = new AlertController();
const alertView = new AlertView();

// Registration of users and topics
alertController.registerUser(1, 'Alejandro');
alertController.registerUser(2, 'Daniel');
alertController.registerTopic('News');

// Subscribe users to topics
alertController.subscribeUserToTopic(1, 'News');

// Send alerts
const alert1 = new InformativeAlert('New update available', new Date(Date.now() + 1000 * 60 * 60));
alertController.sendAlertToTopic('News', alert1);

const alert2 = new UrgentAlert('Critical security update', new Date(Date.now() + 1000 * 60 * 60));
alertController.sendAlertToUser(1, alert2);

// Get unread alerts for a user
const unreadAlerts = alertController.getUnreadAlertsForUser(1);
alertView.showUnreadAlerts(unreadAlerts);
