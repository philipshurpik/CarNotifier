var util = {
    notFound: function(req, res) {
        res.status(404).send('Page not found');
    },
    errorHandler: function(err, req, res) {
        console.log(err.message);
        console.log(err.stack);
        res.status(500).send(err);
    }
};

module.exports = util;