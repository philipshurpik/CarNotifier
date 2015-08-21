var Reflux = require('reflux');
var actions = require('../actions');

var boardStore = Reflux.createStore({
    user: null,

    init() {
        this.user = {
            _id: 100500,
            cars: {
                "2": {
                    marka_id: 18,
                    model_id: 0,
                    title: "Daewoo"
                },
                "3": {
                    marka_id: 6,
                    model_id: 47,
                    title: "Audi"
                }
            }
        };
        this.cars = [];
        this.listenTo(actions.getUser, this.getUser);
    },

    getUser() {
        this.cars = this.getCars(this.user);
        this.trigger({
            user: this.user,
            cars: this.cars
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