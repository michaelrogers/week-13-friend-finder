const friendData = require('../data/friends.js');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.get('/api/friends', (req, res) => {
        res.json(friendData);
    });

};