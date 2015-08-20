var router = require('express').Router();
var usersCollection = app.db.usersCollection;

router.put('/:queryId', function(req, res) {
    var carQuery = req.body.carQuery;

    var param = {};
    param[req.queryId] = carQuery;

    usersCollection
        .update({ userId: req.userId }, {$set: param})
        .then(sendResponse.bind(res));
});

router.delete('/:queryId', function(req, res) {
    var param = {};
    param["cars." + req.queryId] = 1;

    usersCollection
        .update({ userId: req.userId }, {$unset: param})
        .then(sendResponse.bind(res));
});

function sendResponse(result) {
    this.json({
        data: result,
        status: result.ok ? "OK" : false
    });
}

app.param('queryId', function (req, res, next, id) {
    if (!id) {
        next(Error('Request UserId is undefined'));
    }

    req.queryId = parseInt(id, 10);
    next();
});

module.exports = router;
