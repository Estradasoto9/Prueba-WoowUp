const Topic = require('../models/topic');
const TopicService = require('../services/topicService');

jest.mock('../models/topic');

describe('TopicService', () => {
    let topicService;

    beforeEach(() => {
        topicService = require('../services/topicService');
        topicService.topics = new Map();

        Topic.mockClear();
    });

    describe('createTopic', () => {
        it('should create and store a new topic', () => {
            const topicId = 1;
            const topicName = 'General';
            Topic.mockImplementation((id, name) => ({ id, name }));

            const topic = topicService.createTopic(topicId, topicName);
            expect(topic).toEqual({ id: topicId, name: topicName });
            expect(topicService.topics.has(topicId)).toBe(true);
        });
    });

    describe('getTopicById', () => {
        it('should return the topic by ID', () => {
            const topicId = 1;
            const topic = { id: topicId, name: 'General' };
            topicService.topics.set(topicId, topic);

            const retrievedTopic = topicService.getTopicById(topicId);
            expect(retrievedTopic).toEqual(topic);
        });

        it('should return undefined if topic does not exist', () => {
            const retrievedTopic = topicService.getTopicById(1);
            expect(retrievedTopic).toBeUndefined();
        });
    });

    describe('getAllTopics', () => {
        it('should return all topics', () => {
            const topic1 = { id: 1, name: 'General' };
            const topic2 = { id: 2, name: 'Tech' };
            topicService.topics.set(topic1.id, topic1);
            topicService.topics.set(topic2.id, topic2);

            const topics = topicService.getAllTopics();
            expect(topics).toEqual([topic1, topic2]);
        });
    });
});
