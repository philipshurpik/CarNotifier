var mongo = require('promised-mongo');

var carNotifierDb;

module.exports = function(dbName) {
    if (!carNotifierDb) {
        var db = mongo(dbName);
        carNotifierDb = {
            db: db,
            name: dbName,
            usersCollection: db.collection("users"),
            adsCollection: db.collection("ads")
        };
    }

    return carNotifierDb;
};