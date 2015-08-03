var serverPort = 1906;
var express = require('express');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');

var LogMe = require('./app/util/logMe');
var Checker = require('./app/subscriptions/checker');
var PhoneMock = require('./app/phoneMock/phoneMock');

LogMe.init({debug: true});

var phoneMock = new PhoneMock();
var checker = new Checker();
phoneMock.init();
checker.start();

global.app = express();
app.use(bodyParser.json());

app.use(basicAuth(function(user, pass){
        return '1' == user && '1' == pass;
    }));


app.get('/home', function(req, res) {
    res.send('Hello World');
});

app.get('/home2', function(req, res) {
    res.send('Hello Worl222d');
});


app.use('/userQuery', require('./services/userQuery/userQuery'));





app.listen(serverPort, function() {
    console.log('Listening on port ' + serverPort);
});
