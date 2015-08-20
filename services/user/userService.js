var router = require('express').Router();
var usersCollection = app.db.usersCollection;

/* responds with user settings and queries */
router.get('/', function(req, res) {
    var query = { _id: req.userId };

    usersCollection
        .findOne(query)
        .then(function(user) {
            if (!user) {
                res.sendStatus(404);
            }
            res.status(200).json({user: user});
        });
});

/* modifies current user settings */
router.put('/', function(req, res) {
    var newUser = req.body.user;

    usersCollection
        .update({_id: req.userId}, newUser, {upsert: true})
        .then(sendResponse);

    function sendResponse(result) {
        res.json({
            data: result,
            status: result.ok ? "OK" : false
        });
    }
});

app.param('userId', function (req, res, next, id) {
    if (!id) {
        next(Error('Request UserId is undefined'));
    }

    req.userId = parseInt(id, 10);
    next();
});

module.exports = router;


/* old code */
function getUsers() {
    return usersCollection.find().toArray();
}