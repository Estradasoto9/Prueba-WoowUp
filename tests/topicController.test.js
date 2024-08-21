const TopicController = require('../controllers/topicController');
const topicService = require('../services/topicService');

jest.mock('../services/topicService');

describe('TopicController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a topic', () => {
        const req = {
            body: {
                id: 1,
                name: 'New Topic'
            }
        };
        const res = {
            json: jest.fn()
        };
        const topic = { id: 1, name: 'New Topic' };
        topicService.createTopic.mockReturnValue(topic);

        TopicController.createTopic(req, res);

        expect(topicService.createTopic).toHaveBeenCalledWith(1, 'New Topic');
        expect(res.json).toHaveBeenCalledWith(topic);
    });

    test('should get a topic by id', () => {
        const req = {
            params: {
                id: 1 
            }
        };
        const res = {
            json: jest.fn(),
            sendStatus: jest.fn()
        };
        const topic = { id: 1, name: 'Existing Topic' };
        topicService.getTopicById.mockReturnValue(topic);

        TopicController.getTopic(req, res);

        expect(topicService.getTopicById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith(topic);
    });

    test('should return 404 if topic not found', () => {
        const req = {
            params: {
                id: 1
            }
        };
        const res = {
            sendStatus: jest.fn()
        };
        topicService.getTopicById.mockReturnValue(null);

        TopicController.getTopic(req, res);

        expect(topicService.getTopicById).toHaveBeenCalledWith(1); // Verifica el número
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
});
