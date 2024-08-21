const UserController = require('../controllers/userController');
const userService = require('../services/userService');

jest.mock('../services/userService');

describe('UserController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a user', () => {
        const req = {
            body: {
                id: 1,
                name: 'John Doe'
            }
        };
        const res = {
            json: jest.fn()
        };
        const user = { id: 1, name: 'John Doe' };
        userService.createUser.mockReturnValue(user);

        UserController.createUser(req, res);

        expect(userService.createUser).toHaveBeenCalledWith(1, 'John Doe');
        expect(res.json).toHaveBeenCalledWith(user);
    });

    test('should subscribe to a topic', () => {
        const req = {
            body: {
                userId: 1,
                topicId: 2
            }
        };
        const res = {
            json: jest.fn()
        };

        UserController.subscribeToTopic(req, res);

        expect(userService.subscribeToTopic).toHaveBeenCalledWith(1, 2);
        expect(res.json).toHaveBeenCalledWith({ message: 'New topic subscribed' });
    });

    test('should unsubscribe from a topic', () => {
        const req = {
            body: {
                userId: 1,
                topicId: 2
            }
        };
        const res = {
            sendStatus: jest.fn()
        };

        UserController.unsubscribeFromTopic(req, res);

        expect(userService.unsubscribeFromTopic).toHaveBeenCalledWith(1, 2);
        expect(res.sendStatus).toHaveBeenCalledWith(200);
    });

    test('should mark an alert as read', () => {
        const req = {
            body: {
                userId: 1,
                alertId: 3
            }
        };
        const res = {
            sendStatus: jest.fn()
        };

        UserController.markAlertAsRead(req, res);

        expect(userService.markAlertAsRead).toHaveBeenCalledWith(1, 3);
        expect(res.sendStatus).toHaveBeenCalledWith(200);
    });

    test('should get unread alerts', () => {
        const req = {
            params: {
                userId: 1
            }
        };
        const res = {
            json: jest.fn()
        };
        const alerts = [{ id: 1, content: 'Alert 1' }];
        userService.getUnreadAlerts.mockReturnValue(alerts);

        UserController.getUnreadAlerts(req, res);

        expect(userService.getUnreadAlerts).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith(alerts);
    });
});
