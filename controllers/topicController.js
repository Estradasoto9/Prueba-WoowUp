const topicService = require('../services/topicService');

class TopicController {
    createTopic(req, res) {
        const { id, name } = req.body;
        const topic = topicService.createTopic(id, name);
        res.json(topic);
    }

    getTopic(req, res) {
        const { id } = req.params;
        const topic = topicService.getTopicById(id);
        if (topic) {
            res.json(topic);
        } else {
            res.sendStatus(404);
        }
    }
}

module.exports = new TopicController();
