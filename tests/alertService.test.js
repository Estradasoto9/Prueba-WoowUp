const alertService = require('../services/alertService');

describe('AlertService', () => {
    beforeEach(() => {
        alertService.alerts = [];
        alertService.topics = new Map();
    });

    describe('addTopic', () => {
        it('should add a new topic', () => {
            alertService.addTopic(1);
            expect(alertService.topics.has(1)).toBe(true);
        });

        it('should not add duplicate topics', () => {
            alertService.addTopic(1);
            alertService.addTopic(1);
            expect(alertService.topics.get(1).size).toBe(0); // Set should have size 0 because it starts empty
        });
    });

    describe('subscribeUserToTopic', () => {
        it('should subscribe a user to a topic', () => {
            alertService.addTopic(1);
            alertService.subscribeUserToTopic(1, 100);
            expect(alertService.topics.get(1).has(100)).toBe(true);
        });

        it('should not subscribe a user to a non-existent topic', () => {
            alertService.subscribeUserToTopic(2, 100);
            expect(alertService.topics.get(2)).toBeUndefined();
        });
    });

    describe('createAlertForUser', () => {
        it('should create an alert for a user', () => {
            alertService.createAlertForUser(1, 'Urgent', 'Test Message', 1, 100, new Date());
            const alerts = alertService.getAlertsForUser(100);
            expect(alerts.length).toBe(1);
            expect(alerts[0].userId).toBe(100);
            expect(alerts[0].message).toBe('Test Message');
        });
    });

    describe('createAlertForTopic', () => {
        it('should create alerts for all users subscribed to a topic', () => {
            alertService.addTopic(1);
            alertService.subscribeUserToTopic(1, 100);
            alertService.subscribeUserToTopic(1, 200);
            alertService.createAlertForTopic(1, 'Urgent', 'Topic Alert', 1, new Date());
            const alertsForUser100 = alertService.getAlertsForUser(100);
            const alertsForUser200 = alertService.getAlertsForUser(200);
            expect(alertsForUser100.length).toBe(1);
            expect(alertsForUser200.length).toBe(1);
        });

        it('should not create alerts for non-existent topics', () => {
            alertService.createAlertForTopic(1, 'Urgent', 'Topic Alert', 1, new Date());
            const alerts = alertService.getAlertsForTopic(1);
            expect(alerts.length).toBe(0);
        });
    });

    describe('getAlertsForUser', () => {
        it('should return alerts for a user in correct order', () => {
            alertService.addTopic(1);
            alertService.subscribeUserToTopic(1, 100);
            alertService.createAlertForUser(1, 'Urgent', 'Urgent Alert', 1, 100, new Date());
            alertService.createAlertForUser(2, 'Informative', 'Informative Alert', 1, 100, new Date());
            const alerts = alertService.getAlertsForUser(100);
            expect(alerts[0].type).toBe('Urgent');
            expect(alerts[1].type).toBe('Informative');
        });
    });

    describe('getAlertsForTopic', () => {
        it('should return alerts for a topic in correct order', () => {
            alertService.addTopic(1);
            alertService.subscribeUserToTopic(1, 100);
            alertService.createAlertForTopic(1, 'Urgent', 'Urgent Topic Alert', 1, new Date());
            alertService.createAlertForTopic(2, 'Informative', 'Informative Topic Alert', 1, new Date());
            const alerts = alertService.getAlertsForTopic(1);
            expect(alerts[0].type).toBe('Urgent');
            expect(alerts[1].type).toBe('Informative');
        });
    });
});
