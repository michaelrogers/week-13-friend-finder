const path = require('path');

module.exports = (app) => {
    //Route root/survey to the survey page
    app.get('/survey', (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                '../public/survey.html'
            )
        );
    });
    
    //Route for questions.js in data
    app.get('/questions', (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                '../data/questions.js'
            )
        );
    });

    //Route all other traffic to the homepage
    app.use((req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                '../public/home.html'
            )
        );
    });
    
};