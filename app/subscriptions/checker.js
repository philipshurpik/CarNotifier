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
    //checkDb();
    //setInterval(checkDb, 1000 * 10);
};

function checkDb() {
    usersCollection.find({ lastCheckDate: { $lte: Date.now() - 6000 * 1000 } }).toArray()
        .then(getUsersToStart);

    function getUsersToStart(usersList) {
        usersList.forEach(function(user) {
            startBot(user);
            updateUser(user);
        });
    }
}

function startBot(user) {
    var bot = new Bot();
    bot.start(user);
}

function updateUser(user) {
    var query = { _id: user._id };
    var userToUpdate = _.cloneDeep(user);
    userToUpdate.lastCheckDate = Date.now();

    usersCollection.update(query, userToUpdate)
        .catch(function(exc) {
            LogMe.error("Update error: " + exc);
        });
}

module.exports = Checker;