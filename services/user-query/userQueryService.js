var router = require('express').Router();
var query = require('./queries.json');

router.put('/', function(req, res) {
    /* add or change existing user query */
    res.json(query);
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

