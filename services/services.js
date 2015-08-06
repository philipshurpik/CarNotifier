var serverPort = 1906;
var express = require('express');
var bodyParser = require('body-parser');

global.app = express();
app.db = require('../carNotifierDb')(process.env.DB_NAME || 'carNotifier');

app.use(bodyParser.json());

app.use('/user/:userId', require('./user/userService'));
app.use('/user/:userId/query/:queryId', require('./car-query/carQueryService'));
app.use('/user/:userId/query/:queryId/ads', require('./ads/adsService'));

app.listen(serverPort, function() {
    console.log('Listening on port ' + serverPort);
});

module.exports = app;