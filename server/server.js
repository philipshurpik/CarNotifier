require('./carNotifierDb')('carNotifier');
var LogMe = require('./app/util/logMe');
var Checker = require('./app/subscriptions/checker');
LogMe.init({debug: true});

var app = require('./services/services');

var checker = new Checker(app.db);
checker.start();


