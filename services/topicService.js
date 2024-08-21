const Topic = require('../models/topic');

class TopicService {
    constructor() {
        this.topics = new Map();
    }

    createTopic(id, name) {
        const topic = new Topic(id, name);
        this.topics.set(id, topic);
        return topic;
    }

    getTopicById(id) {
        return this.topics.get(id);
    }

    getAllTopics() {
        return Array.from(this.topics.values());
    }
}

module.exports = new TopicService();
