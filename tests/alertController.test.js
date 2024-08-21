const AlertController = require('../controllers/alertController');
const alertService = require('../services/alertService');

jest.mock('../services/alertService');

describe('AlertController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create an alert for a user', () => {
        const req = {
            body: {
                id: 1,
                type: 'Urgent',
                message: 'Test Alert',
                topicId: 2,
                userId: 3,
                expirationDate: '2024-12-31T23:59:59Z'
            }
        };
        const res = {
            json: jest.fn()
        };
        const topic = { id: 1, type: 'Urgent', message: 'Test Alert' };
        alertService.createAlertForUser.mockReturnValue(topic);

        AlertController.createAlert(req, res);

        expect(alertService.createAlertForUser).toHaveBeenCalledWith(
            1,
            'Urgent',
            'Test Alert',
            2,
            3,
            new Date('2024-12-31T23:59:59Z')
        );
        expect(res.json).toHaveBeenCalledWith({ message: 'Alert created and sent' });
    });

    test('should handle errors when creating an alert', () => {
        const req = {
            body: {
                id: 1,
                type: 'Urgent',
                message: 'Test Alert',
                topicId: 2,
                userId: 3,
                expirationDate: '2024-12-31T23:59:59Z'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        alertService.createAlertForUser.mockImplementation(() => {
            throw new Error('Test Error');
        });

        AlertController.createAlert(req, res);

        expect(alertService.createAlertForUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });

    test('should get alerts for a user', () => {
        const req = {
            params: {
                userId: '1'
            }
        };
        const res = {
            json: jest.fn()
        };
        const alerts = [{ id: 1, message: 'Alert for user' }];
        alertService.getAlertsForUser.mockReturnValue(alerts);

        AlertController.getAlertsForUser(req, res);

        expect(alertService.getAlertsForUser).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith(alerts);
    });

    test('should get alerts for a topic', () => {
        const req = {
            params: {
                topicId: '2'
            }
        };
        const res = {
            json: jest.fn()
        };
        const alerts = [{ id: 1, message: 'Alert for topic' }];
        alertService.getAlertsForTopic.mockReturnValue(alerts);

        AlertController.getAlertsForTopic(req, res);

        expect(alertService.getAlertsForTopic).toHaveBeenCalledWith(2);
        expect(res.json).toHaveBeenCalledWith(alerts);
    });
});
