var router = require('express').Router();
var user = require('./users.json');

router.get('/', function(req, res) {
    /* responds with user settings and queries */
    console.log('user req');
    res.json(user);
});

router.post('/', function(req, res) {
    /* modifies current user settings */
    res.json(user);
});

module.exports = router;

