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
                updateAdsList(responseIds, user, carId);
            });
            //.then(getCarsDetails.bind(this, carKey));
    }
};

function getCarsQuery(user, car) {
    return {
        uri: "https://auto.ria.com/blocks_search_ajax/search/",
        qs: {
            countpage: 20,
            category_id: 1,
            currency: 1,
            state: user.state,
            city: user.city,
            top: enums.Query.TOP.HOUR6,
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

function updateAdsList(responseIds, user, carId) {
    var query = { userId: user._id, carId: carId, riaId: {$in: responseIds} };

    return adsCollection
        .find(query, {riaId: 1, _id:0}).limit(20).toArray()
        .then(updateUserAds);

    function updateUserAds(existingAds) {
        var existingIds = _.pluck(existingAds, 'riaId');
        var newAdIds = _.difference(responseIds, existingIds);

        var newAds = newAdIds.map(function(itemId) {
            return {
                "userId": user._id,
                "carId": carId,
                "riaId": itemId,
                "date": Date.now(),
                "isViewed": false
            }
        });

        if (!newAdIds.length) {
            LogMe.log('bot: ' + user._id + ' nothing new found');
            return Promise.resolve([]);
        }
        LogMe.log('bot: ' + user._id + ', car: ' + carId + ' found new ads: ' + newAdIds.length);
        return adsCollection.insert(newAds);
    }
}

function getCarsDetails(newCarIds) {
    var user = user;
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