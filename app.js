const express = require('express');
const bodyParser = require('body-parser');
const alertRoutes = require('./routes/alertRoutes');
const topicRoutes = require('./routes/topicRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/alerts', alertRoutes);
app.use('/topics', topicRoutes);
app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
