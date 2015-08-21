var _ = require('lodash');
var LogMe = require('../util/logMe');
var Bot = require('./bot');
var usersCollection;
var db;

function Checker(_db) {
    db = _db;
    usersCollection = db.usersCollection;
}

Checker.prototype.start = function() {
    LogMe.log('checker started');
    try {
        checkDb();
        setInterval(checkDb, 1000 * 10);
    }
    catch (exc) {
        LogMe.error(exc);
    }
};

function checkDb() {
    var dateQuery = { lastCheckDate: { $lte: Date.now() - 300 * 1000 } };
    usersCollection.find({$or: [dateQuery, {lastCheckDate: null}]}).toArray()
        .then(getUsersToStart);

    function getUsersToStart(usersList) {
        usersList.forEach(function(user) {
            startBot(user);
            updateUser(user);
        });
    }
}

function startBot(user) {
    var bot = new Bot(db);
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