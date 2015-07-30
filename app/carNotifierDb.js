var mongo = require('promised-mongo');
var db = mongo('carNotifier');

var carNotifierDb = {
    db: db,
    usersCollection: db.collection("users"),
    adsCollection: db.collection("ads")
};

module.exports = carNotifierDb;