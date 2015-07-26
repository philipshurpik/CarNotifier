var LogMe = require('../util/logMe');

function Checker() {

}

Checker.prototype.start = function() {
    LogMe.log('checker started');
};

module.exports = Checker;