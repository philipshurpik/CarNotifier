var util = {
    notFound: function(req, res) {
        res.status(404).send('Page not found');
    },
    errorHandler: function(err, req, res) {
        console.log(err.message);
        console.log(err.stack);
        res.status(500).send(err);
    },
    cors: function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
    }
};

module.exports = util;