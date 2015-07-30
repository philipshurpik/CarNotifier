var LogMe = require('../util/logMe');
var request = require('request-promise');
var user;

function Bot(_user) {
    user = _user;
}

Bot.prototype.start = function () {
    LogMe.log('bot started: ' + user.userId);

    var options = {
        uri: "http://auto.ria.com/blocks_search_ajax/search/?countpage=1000&category_id=1&marka_id[0]=3&model_id[0]=0&s_yers[0]=2009&po_yers[0]=2011&marka_id[1]=9&model_id[1]=3219&s_yers[1]=2008&po_yers[1]=2011&currency=1&state[0]=10&city[0]=0&fuelRatesType=city"
        //uri: "http://auto.ria.com/blocks_search_ajax/search/",
        /*qs: {
            countpage: 100,
            category_id: 1,
            marka_id: [3, 9],
            model_id: [0, 3219],
            s_yers: [2005, 2004],
            po_yers: [2015, 2015],
            currency: 1,
            state: [10],
            city: [0]
        }*/
        //getQuery(user)
    };

    this.getCarsList(options);
};

function getQuery(user) {
    var qs = {
        countpage: 100,
        category_id: 1,
        currency: 1,
        state: user.state,
        city: user.city,
        marka_id: [],
        model_id: [],
        s_yers: [],
        po_yers: []
    };

    if (user.cars) {
        user.cars.forEach(function(car) {
            qs.marka_id.push(car.marka_id);
            qs.model_id.push(car.model_id);
            qs.s_yers.push(car.s_yers);
            qs.po_yers.push(car.po_yers);
        })
    }

    return qs;
}

Bot.prototype.getCarsList = function (list) {
    request(list)
        .then(function (response) {
            var parsed = JSON.parse(response);
            var result = parsed.result.search_result;
            var ids = result.ids;
            LogMe.log(ids);
            LogMe.log(ids.length);

            this.getCarById(ids[0]);

        }.bind(this))
        .catch(LogMe.error);
};

Bot.prototype.getCarById = function (id) {
    var options = {
        uri: "http://auto.ria.com/demo/bu/searchPage/v2/view/auto/" + id
    };

    request(options)
        .then(function (response) {
            var result = JSON.parse(response);
            var info = {
                USD: result.USD,
                addDate: result.addDate,
                title: result.title,
                markName: result.markName,
                modelName: result.modelName,
                locationCityName: result.locationCityName,
                linkToView: result.linkToView,
                details: {
                    description: result.autoData.description,
                    fuelName: result.autoData.fuelName,
                    race: result.autoData.race,
                    gearboxName: result.autoData.gearboxName,
                    year: result.autoData.year
                }
            };
            LogMe.log(info);
        })
        .catch(LogMe.error)
};


module.exports = Bot;