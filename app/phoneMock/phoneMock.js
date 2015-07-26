var LogMe = require('../util/logMe');

function PhoneMock() {

}

PhoneMock.prototype.init = function() {
    LogMe.log('phonemock init');
};

module.exports = PhoneMock;