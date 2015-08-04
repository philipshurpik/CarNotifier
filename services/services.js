var serverPort = 1906;
var express = require('express');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');

global.app = express();
app.use(bodyParser.json());

app.use(basicAuth(function(user, pass){
    return '1' == user && '1' == pass;
}));

app.use('/user', require('./user/userService'));
app.use('/user/query', require('./user-query/userQueryService'));
app.use('/user/query/:queryid/ads', require('./ads/adsService'));




app.listen(serverPort, function() {
    console.log('Listening on port ' + serverPort);
});
