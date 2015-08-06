var router = require('express').Router();
var usersCollection = app.db.usersCollection;

/* add or change existing user query */
router.put('/', function(req, res) {
    var query = req.body;
    usersCollection
        .findOne({ userId: req.userId })
        .then(updateUserQuery)
        .then(sendResponse);

    function updateUserQuery(user) {

    }

    function addQuery(user) {
        user.q
    }

    function sendResponse() {
        res.json(query);
    }
});

router.delete('/', function(req, res) {
    /* delete existing user query */
    res.json(query);
});

app.param('queryId', function (req, res, next, id) {
    req.queryId = parseInt(id, 10);
    next();
});

module.exports = router;
