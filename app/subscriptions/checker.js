var LogMe = require('../util/logMe');
var Bot = require('./bot');

function Checker() {

}

Checker.prototype.start = function() {
    LogMe.log('checker started');
    var bot = new Bot();
    bot.start();

};

module.exports = Checker;