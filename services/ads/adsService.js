var router = require('express').Router();
var ads = require('./ads.json');

router.get('/', function(req, res) {
    var results = [];
    ads.forEach(function(item) {
        if (item.queryId === req.queryId) {
            results.push(item);
        }
    });

    res.json(results);
});

module.exports = router;

