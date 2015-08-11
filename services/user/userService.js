var router = require('express').Router();
var usersCollection = app.db.usersCollection;

/* responds with user settings and queries */
router.get('/', function(req, res) {
    var query = { userId: req.userId };

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
    newUser.cars = newUser.cars || [];

    usersCollection.update({userId: newUser.userId}, newUser, { upsert: true })
        .then(sendResponse);

    function sendResponse(users) {
        res.status(200).json({users: users});
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