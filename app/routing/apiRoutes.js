const friendData = require('../data/friends.js');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.get('/api/friends', (req, res) => {
        res.json(friendData);
    });

    app.post('/api/friends', (req, res) => {
        let parsedRequestData = JSON.parse(req.body);
        console.log(parsedRequestData.photo);
        // res.send(req.body);
        res.json(parsedRequestData)

    });
};