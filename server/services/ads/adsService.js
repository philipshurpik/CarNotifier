var router = require('express').Router();
var ads = require('./ads.json');
var adsCollection = app.db.adsCollection;
var _ = require('lodash');

router.get('/new', function(req, res) {
    var query = { userId: req.userId, carId: req.queryId.toString(), isViewed: false };

    adsCollection
        .find(query)
        .then(function(results) {
            var ids = _.pluck(results, "_id");

            adsCollection
                .update({ _id: {$in: ids}}, {$set: {isViewed: true}}, {multi: true})
                .then(function() {
                    res.json({ads: results});
                });
        });
});

module.exports = router;

