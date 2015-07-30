var LogMe = require('../util/logMe');
var mongo = require('promised-mongo');
var Promise = require('bluebird');
var data = require('./data');
var db;
var usersCollection;
var carsCollection;

function PhoneMock() {}

PhoneMock.prototype.init = function () {
    db = mongo('carNotifier');
    usersCollection = db.collection("users");
    usersCollection.remove();
    carsCollection = db.collection("cars");
    carsCollection.remove();

    LogMe.log('phonemock init');

    Promise.join(initUsers(), initCars(), function show(users, cars) {
        LogMe.log(users);
        LogMe.log(cars);
    });
};

function initUsers() {
    return usersCollection.insert(data.user)
        .then(getUsers);

    function getUsers() {
        return usersCollection.find().toArray();
    }
}

function initCars() {
    return carsCollection.insert(data.cars)
        .then(getCars);

    function getCars() {
        return carsCollection.find().toArray();
    }
}

module.exports = PhoneMock;