var Reflux = require('reflux');
var actions = require('../actions');
var request = require('superagent');

var boardStore = Reflux.createStore({
    user: null,

    init() {
        this.user = {};
        this.cars = [];
        this.listenTo(actions.getUser, this.getUser.bind(this));
    },

    getUser() {
        var userId = 100500;
        var url = "http://localhost:1906/user/" + userId;

        request.get(url, (err, response) => {
            this.user = response.body.user;
            this.cars = this.getCars(this.user);
            this.trigger({
                user: this.user,
                cars: this.cars
            });
        });
    },

    getCars(user) {
        var cars = [];
        if (user.cars) {
            cars = Object.keys(user.cars).map((key) => {
                var item = user.cars[key];
                item._id = key;
                return item;
            });
        }
        return cars;
    }
});

module.exports = boardStore;