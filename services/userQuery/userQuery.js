var router = require('express').Router();
var query = require('./query.json');

router.get('/userQuery', function(req, res) {
    res.json(query);
});

router.get('/userQuery2', function(req, res) {
    res.json({hello: "world"});
});

module.exports = router;

