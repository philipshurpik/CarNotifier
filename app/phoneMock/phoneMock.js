var LogMe = require('../util/logMe');
var Promise = require('bluebird');
var data = require('./data');
var carNotifierDb = require('../carNotifierDb');
var usersCollection;

function PhoneMock() {
    usersCollection = carNotifierDb.usersCollection;
    //usersCollection.remove();

    data.users[0].lastCheckDate = Date.now() - 1000 * 30;
    data.users[1].lastCheckDate = Date.now() - 1000 * 60 * 2;
}

PhoneMock.prototype.init = function () {
    usersCollection.count()
        .then(initUsers)
        .then(showUsers);

    function showUsers(users) {
        LogMe.log(users);
    }
};

function initUsers(count) {
    if (count === 0) {
        return usersCollection.insert(data.users)
            .then(getUsers);
    }
    else {
        return getUsers();
    }

    function getUsers() {
        return usersCollection.find().toArray();
    }
}

module.exports = PhoneMock;