class Topic {
    constructor(id, name) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('ID must be a positive integer');
        }
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Name must be a non-empty string');
        }

        this.id = id;
        this.name = name;
    }
}

module.exports = Topic;
