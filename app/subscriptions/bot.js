var LogMe = require('../util/logMe');
var request = require('request-promise');
var Promise = require('bluebird');
var _ = require('lodash');
var enums = require('../enums');
var adsCollection;

function Bot(db) {
    adsCollection = db.adsCollection;
}

Bot.prototype.start = function (user) {
    try {
        LogMe.log('bot started: ' + user._id);

        if (user.cars) {
            Object.keys(user.cars).forEach(processCar);
        }
    }
    catch (exc) {
        LogMe.error(exc);
    }

    function processCar(carId) {
        var car = user.cars[carId];
        var carsQuery = getCarsQuery(user, car);

        getCarsList(carsQuery)
            .then(function(responseIds) {
                getNewCarsList(responseIds, user, carId);
            });
            //.then(getCarsDetails.bind(this, carKey));
    }
};

function getCarsQuery(user, car) {
    return {
        uri: "https://auto.ria.com/blocks_search_ajax/search/",
        qs: {
            countpage: 100,
            category_id: 1,
            currency: 1,
            state: user.state,
            city: user.city,
            top: user.top,
            marka_id: [car.marka_id],
            model_id: [car.model_id],
            s_yers: [car.s_yers],
            po_yers: [car.po_yers]
        }
    };
}

function getCarsList(options) {
    return request(options)
        .then(processCarsList)
        .catch(handleError);

    function processCarsList(response) {
        var parsed = JSON.parse(response);
        var result = parsed.result.search_result;

        return Promise.resolve(result.ids);
    }

    function handleError(error) {
        LogMe.error(error);
        return Promise.reject(error);
    }
}

function getNewCarsList(responseIds, user, carId) {
    var query = { userId: this.user._id, carId: carId };

    return adsCollection
        .findOne(query)
        .then(processAds)
        .then(updateUserAds);

    function processAds(item) {
        var carIds = {
            all: item ? item.list : [],
            new: []
        };
        responseIds.forEach(function(id) {
           if (carIds.all.indexOf(id) === -1) {
               carIds.all.push(id);
               carIds.new.push(id);
           }
        });
        return Promise.resolve(carIds);
    }

    function updateUserAds(carIds) {
        if (!carIds.new.length) {
            LogMe.log('bot: ' + user._id + ' nothing new found');
            return Promise.resolve([]);
        }
        return adsCollection
            .update(query, { $set: { list: carIds.all } })
            .then(function() {
                return Promise.resolve(carIds.new);
            });
    }
}

function getCarsDetails(newCarIds) {
    var user = this.user;
    Promise.all(newCarIds.map(getCarById))
        .then(processDetails.bind(this));

    function getCarById(id) {
        var options = { uri: "https://auto.ria.com/demo/bu/searchPage/v2/view/auto/" + id };
        return request(options);
    }

    function processDetails(carDetails) {
        carDetails.map(function(response) {
            var carData = processResponse(response);

            LogMe.log('**********************************');
            LogMe.log("* User:        " + user._id);
            LogMe.log("* Date:        " + carData.addDate);
            LogMe.log("* Title:       " + carData.title);
            LogMe.log("* Price:       $" + carData.USD);
            LogMe.log("* Year:        " + carData.details.year);
            LogMe.log("* Mileage:     " + carData.details.race);
            LogMe.log("* Description: " + carData.details.description);
        });

        function processResponse(response) {
            var result = JSON.parse(response);
            return {
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
        }
    }
}

module.exports = Bot;