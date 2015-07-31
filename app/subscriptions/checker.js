var _ = require('lodash');
var LogMe = require('../util/logMe');
var Bot = require('./bot');
var carNotifierDb = require('../carNotifierDb');
var usersCollection;

function Checker() {
    usersCollection = carNotifierDb.usersCollection;
}

Checker.prototype.start = function() {
    LogMe.log('checker started');
    checkDb();
    setInterval(checkDb, 1000 * 10);
};

function checkDb() {
    usersCollection.find({ lastCheckDate: { $lte: Date.now() - 60 * 1000 } }).toArray()
        .then(getUsersToStart);

    function getUsersToStart(results) {
        results.forEach(function(item) {
            startBot(item);
            updateUser(item);
        });
    }
}

function startBot(item) {
    var bot = new Bot(item);
    bot.start();
}

function updateUser(item) {
    var query = { _id: item._id };
    var itemToUpdate = _.cloneDeep(item);
    itemToUpdate.lastCheckDate = Date.now();

    usersCollection.update(query, itemToUpdate)
        .catch(function(exc) {
            LogMe.error("Update error: " + exc);
        });
}

module.exports = Checker;