const User = require('../models/user');
const UserService = require('../services/userService');

jest.mock('../models/user');

describe('UserService', () => {
    let userService;

    beforeEach(() => {
        userService = require('../services/userService');
        userService.users = new Map();

        User.mockClear();
    });

    describe('createUser', () => {
        it('should create and store a new user', () => {
            const userId = 1;
            const userName = 'John Doe';
            User.mockImplementation((id, name) => ({ id, name, topics: new Set(), alerts: [] }));
            
            const user = userService.createUser(userId, userName);
            expect(user).toEqual({ id: userId, name: userName, topics: new Set(), alerts: [] });
            expect(userService.users.has(userId)).toBe(true);
        });
    });

    describe('subscribeToTopic', () => {
        it('should subscribe a user to a topic', () => {
            const userId = 1;
            const topicId = 10;
            const user = { id: userId, subscribeToTopic: jest.fn() };
            userService.users.set(userId, user);

            userService.subscribeToTopic(userId, topicId);
            expect(user.subscribeToTopic).toHaveBeenCalledWith(topicId);
        });

        it('should not throw error if user does not exist', () => {
            expect(() => {
                userService.subscribeToTopic(1, 10);
            }).not.toThrow();
        });
    });

    describe('unsubscribeFromTopic', () => {
        it('should unsubscribe a user from a topic', () => {
            const userId = 1;
            const topicId = 10;
            const user = { id: userId, unsubscribeFromTopic: jest.fn() };
            userService.users.set(userId, user);

            userService.unsubscribeFromTopic(userId, topicId);
            expect(user.unsubscribeFromTopic).toHaveBeenCalledWith(topicId);
        });

        it('should not throw error if user does not exist', () => {
            expect(() => {
                userService.unsubscribeFromTopic(1, 10);
            }).not.toThrow();
        });
    });

    describe('markAlertAsRead', () => {
        it('should mark an alert as read for a user', () => {
            const userId = 1;
            const alertId = 100;
            const user = { id: userId, markAlertAsRead: jest.fn() };
            userService.users.set(userId, user);

            userService.markAlertAsRead(userId, alertId);
            expect(user.markAlertAsRead).toHaveBeenCalledWith(alertId);
        });

        it('should not throw error if user does not exist', () => {
            expect(() => {
                userService.markAlertAsRead(1, 100);
            }).not.toThrow();
        });
    });

    describe('getUnreadAlerts', () => {
        it('should return unread alerts for a user', () => {
            const userId = 1;
            const user = {
                id: userId,
                getUnreadAlerts: jest.fn().mockReturnValue([{ id: 100, message: 'Test Alert' }])
            };
            userService.users.set(userId, user);

            const alerts = userService.getUnreadAlerts(userId);
            expect(alerts).toEqual([{ id: 100, message: 'Test Alert' }]);
        });

        it('should return empty array if user does not exist', () => {
            const alerts = userService.getUnreadAlerts(1);
            expect(alerts).toEqual([]);
        });
    });

    describe('getUserById', () => {
        it('should return the user by ID', () => {
            const userId = 1;
            const user = { id: userId, name: 'John Doe' };
            userService.users.set(userId, user);

            const retrievedUser = userService.getUserById(userId);
            expect(retrievedUser).toEqual(user);
        });

        it('should return undefined if user does not exist', () => {
            const retrievedUser = userService.getUserById(1);
            expect(retrievedUser).toBeUndefined();
        });
    });

    describe('getAllUsers', () => {
        it('should return all users', () => {
            const user1 = { id: 1, name: 'John Doe' };
            const user2 = { id: 2, name: 'Jane Doe' };
            userService.users.set(user1.id, user1);
            userService.users.set(user2.id, user2);

            const users = userService.getAllUsers();
            expect(users).toEqual([user1, user2]);
        });
    });
});
