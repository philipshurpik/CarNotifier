var router = require('express').Router();
var usersCollection = app.db.usersCollection;

/* add or change existing user query */

router.post('/', function(req, res) {
    var carQuery = req.body.carQuery;

    usersCollection
        .findOne({ userId: req.userId })
        .then(addUserCarQuery)
        .then(sendResponse);

    function addUserCarQuery(user) {
        user.cars = user.cars || [];
        carQuery.id = !user.cars.length ? 1 : (_.max(user.cars, 'id').id + 1);
        user.cars.push(carQuery);
        return usersCollection.save(user);
    }

    function sendResponse() {
        res.json(query);
    }
});

router.put('/:queryId', function(req, res) {
    var carQuery = req.body.carQuery;

    usersCollection
        .findOne({ userId: req.userId })
        .then(updateUserCarQuery)
        .then(sendResponse);

    function updateUserCarQuery(user) {
        user.cars = user.cars || [];

        var existingQuery = _.find(user.cars, function(item) {
            return item.id === carQuery.id;
        });

        if (existingQuery) {

        }

        carQuery.id = !user.cars.length ? 1 : (_.max(user.cars, 'id').id + 1);
        user.cars.push(carQuery);
        return usersCollection.save(user);
    }

    function sendResponse() {
        res.json(query);
    }
});

router.delete('/:queryId', function(req, res) {
    /* delete existing user query */
    res.json(query);
});

function sendResponse(user) {
    res.json({user: user });
}

app.param('queryId', function (req, res, next, id) {
    if (!id) {
        next(Error('Request UserId is undefined'));
    }

    req.queryId = parseInt(id, 10);
    next();
});

module.exports = router;
