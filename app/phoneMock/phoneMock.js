var LogMe = require('../util/logMe');

function PhoneMock() {

}

PhoneMock.prototype.init = function() {
    LogMe.log('phonemock init');
    var userData = {
        userId: 1,
        state: [10],
        city: [0],
        marka_id: [],
        model_id: [],
        s_yers: [],
        po_yers: []
    };

    Object.keys(queries).map(function(key) {
        var item = queries[key];
        Object.keys(item).map(function(itemKey) {
            var value = item[itemKey];
            userData[itemKey].push(value);
        });
    })

};

var queries = {
    bmw: {
        marka_id: 9,
        model_id: 3219,
        s_yers: 2005,
        po_yers: 2013
    },
    audi: {
        marka_id: 6,
        model_id: 47,
        s_yers: 2005,
        po_yers: 2013
    },
    alfa: {
        marka_id: 3,
        model_id: 0,
        s_yers: 2005,
        po_yers: 2013
    }
};

module.exports = PhoneMock;