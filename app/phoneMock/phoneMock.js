var LogMe = require('../util/logMe');
var format = require('util').format;
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
var db;

function PhoneMock() {
    db = new Db('carNotifier', new Server('localhost', 27017));
}

PhoneMock.prototype.init = function() {
    LogMe.log('phonemock init');

    db.open(onConnect);
};

function onConnect(err, db) {
    initUsers(err, db);
}

function initUsers(err, db) {
    var userData = {
        userId: 1,
        state: [10],
        city: [0]
    };

    var collection = db.collection("users");
    collection.insert(userData, function(err, result) {
        collection.count(function(err, count) {
            LogMe.log(format("users count = %s", count));
        });

        collection.find().toArray(function(err, results) {
            LogMe.log(results);
            initCars(err, db);
        });
    });
}

function initCars(err, db) {
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
    collection.insert(carsData, function(err, result) {
        collection.count(function(err, count) {
            LogMe.log(format("cars count = %s", count));
        });

        collection.find().toArray(function(err, results) {
            LogMe.log(results);
            db.close();
        });
    });
}

module.exports = PhoneMock;