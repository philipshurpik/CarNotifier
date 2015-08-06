var router = require('express').Router();
var usersCollection = app.db.usersCollection;

console.log(app.db.name);

/* responds with user settings and queries */
router.get('/', function(req, res) {
    var query = { userId: req.userId };

    usersCollection
        .findOne(query)
        .then(function(user) {
            if (!user) {
                res.writeHead(404);
                res.end();
            }
            res.json(user);
        });
});

/* modifies current user settings */
router.put('/', function(req, res) {
    var newUser = req.body;
    newUser.cars = newUser.cars || [];

    usersCollection.update({userId: newUser.userId}, newUser, { upsert: true })
        .then(sendResponse);

    function sendResponse(users) {
        res.json(users);
    }
});

app.param('userId', function (req, res, next, id) {
    req.userId = parseInt(id, 10);
    next();
});

module.exports = router;


/* old code */
function getUsers() {
    return usersCollection.find().toArray();
}