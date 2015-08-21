var Reflux = require('reflux');

var actions = Reflux.createActions([
    "getUser",
    "saveUser",
    "saveCarQuery",
    "deleteCarQuery",
    "getAds"
]);

module.exports = actions;