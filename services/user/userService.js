var router = require('express').Router();
var usersCollection = app.db.usersCollection;

/* responds with user settings and queries */
router.get('/', function(req, res) {
    var query = { userId: req.userId };

    usersCollection
        .findOne(query)
        .then(function(user) {
            res.json(user);
        });
});

/* modifies current user settings */
router.post('/', function(req, res) {

    usersCollection.insert(req.body)
        .then(getUsers)
        .then(sendResponse);

    function getUsers() {
        return usersCollection.find().toArray();
    }

    function sendResponse(users) {
        res.json(users);
    }
});

app.param('userId', function (req, res, next, id) {
    req.userId = parseInt(id, 10);
    next();
});

module.exports = router;

