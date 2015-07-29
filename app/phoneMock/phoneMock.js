var LogMe = require('../util/logMe');
var format = require('util').format;
var mongo = require('promised-mongo');
var db;

function PhoneMock() {
    db = mongo('carNotifier');
}

PhoneMock.prototype.init = function () {
    LogMe.log('phonemock init');

    initUsers();
};

function initUsers() {
    var userData = {
        userId: 1,
        state: [10],
        city: [0]
    };

    var collection = db.collection("users");
    collection.remove();
    collection.insert(userData).then(function (result) {
        collection.count().then(function (count) {
            LogMe.log(format("users count = %s", count));
        });

        collection.find().toArray().then(function (results) {
            LogMe.log(results);
            initCars();
        });
    });
}

function initCars() {
    var carsData = [
        {
            userId: 1,
            title: "BMW",
            marka_id: 9,
            model_id: 3219,
            s_yers: 2005,
            po_yers: 2013
        },
        {
            userId: 1,
            title: "Audi",
            marka_id: 6,
            model_id: 47,
            s_yers: 2005,
            po_yers: 2013
        }, {
            userId: 1,
            title: "Alfa Romeo",
            marka_id: 3,
            model_id: 0,
            s_yers: 2005,
            po_yers: 2013
        }
    ];

    var collection = db.collection("cars");
    collection.remove();
    collection.insert(carsData).then(function (result) {
        collection.count().then(function (count) {
            LogMe.log(format("cars count = %s", count));
        });

        collection.find().toArray().then(function (results) {
            LogMe.log(results);
            db.close();
        });
    });
}

module.exports = PhoneMock;