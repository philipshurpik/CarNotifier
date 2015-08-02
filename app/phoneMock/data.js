var enums = require('../enums');

module.exports = {
    users: [/*{
        userId: 1,
        state: [10],
        city: [0],
        top: enums.Query.TOP.TODAY,
        cars: [{
            title: "BMW",
            marka_id: 9,
            model_id: 3219,
            s_yers: 2005,
            po_yers: 2013
        }, {
            title: "Alfa Romeo",
            marka_id: 3,
            model_id: 0,
            s_yers: 2005,
            po_yers: 2013
        }]
    }, */{
        userId: 2,
        state: [0],
        city: [0],
        top: enums.Query.TOP.TODAY,
        cars: [{
            title: "Audi",
            marka_id: 6,
            model_id: 47
        }]
    }, {
        userId: 3,
        state: [0],
        city: [0],
        top: enums.Query.TOP.HOUR1,
        cars: [{
            title: "Daewoo",
            marka_id: 18,
            model_id: 0
        }]
    }]
};