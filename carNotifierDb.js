var mongo = require('promised-mongo');

var carNotifierDb;

module.exports = function(dbName, force) {
    if (!carNotifierDb || force) {
        var db = mongo(dbName);
        carNotifierDb = {
            db: db,
            usersCollection: db.collection("users"),
            adsCollection: db.collection("ads")
        };
    }

    return carNotifierDb;
};