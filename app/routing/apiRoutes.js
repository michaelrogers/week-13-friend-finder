const friendData = require('../data/friends.js');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.get('/api/friends', (req, res) => {
        res.json(friendData);
    });

    app.post('/api/friends', (req, res) => {
        let parsedRequestData = JSON.parse(req.body);
        
        const differenceCount = (userInputArray, friendArray) => {
            let count = 0;
            userInputArray.map((question, index) => {
                count += Math.abs(parseFloat(question) - parseFloat(friendArray[index]))
            });
            return count;
        };

        //Compare scores
        let closestMatch = {
            matchDifference: null,
            friendObject: {}
        }
        let difference = null;
        friendData.map((friend) => {
            difference = differenceCount(parsedRequestData.scores, friend.scores);
            if (closestMatch.matchDifference == null ||
                difference < closestMatch.matchDifference
            ) {
                closestMatch.matchDifference = difference;
                closestMatch.friendObject = friend;
            }
        });
        //Push user entry into server data
        friendData.push(parsedRequestData);
        //Return the closest match to client
        res.json((closestMatch))

    });
};