const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

//Make static files in public folder accessible
app.use(express.static(path.join(__dirname, "/app/public")));

//Body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json;"}));



//Require routing files in app/routing
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

app.listen(port, () => {
    console.log(`App running on ${port}`);
});
