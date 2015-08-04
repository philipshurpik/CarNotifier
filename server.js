var LogMe = require('./app/util/logMe');
var Checker = require('./app/subscriptions/checker');
var PhoneMock = require('./app/phoneMock/phoneMock');

LogMe.init({debug: true});

var phoneMock = new PhoneMock();
var checker = new Checker();
phoneMock.init();
checker.start();


require('./services/services');