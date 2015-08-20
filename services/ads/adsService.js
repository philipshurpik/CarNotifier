var router = require('express').Router();
var ads = require('./ads.json');
var adsCollection = app.db.adsCollection;
var _ = require('lodash');

router.get('/new', function(req, res) {
    var resultAds = null;
    var query = { userId: req.userId, carId: req.queryId, isViewed: false };

    adsCollection
        .find(query)
        .then(function(results) {
            resultAds = results;

            var ids = _.pluck(results, "_id");

            return adsCollection
                .update({ _id: {$in: ids}}, {$set: {isViewed: true}}, {multi: true})
        })
        .then(function() {
            res.json({ads: resultAds});
        })
});

module.exports = router;

