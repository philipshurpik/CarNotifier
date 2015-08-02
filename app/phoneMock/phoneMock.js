var LogMe = require('../util/logMe');
var data = require('./data');
var carNotifierDb = require('../carNotifierDb');
var usersCollection;
var adsCollection;

function PhoneMock() {
    usersCollection = carNotifierDb.usersCollection;
    adsCollection = carNotifierDb.adsCollection;
    usersCollection.remove();
    adsCollection.remove();

    data.users.forEach(function(user) {
        user.lastCheckDate = Date.now() - 1000 * Math.floor(Math.random() * 60);
    });
}

PhoneMock.prototype.init = function () {
    usersCollection.count()
        .then(initUsers)
        .then(showUsers);

    function showUsers(users) {
        //LogMe.log(users);
    }
};

function initUsers(count) {
    if (count === 0) {
        return usersCollection.insert(data.users)
            .then(initAdsCollection)
            .then(getUsers);
    }
    else {
        return getUsers();
    }

    function initAdsCollection() {
        var ads = data.users.map(function(item) {
            return {
                userId: item.userId,
                list: []
            }
        });

        return adsCollection.insert(ads);
    }

    function getUsers() {
        return usersCollection.find().toArray();
    }
}

module.exports = PhoneMock;