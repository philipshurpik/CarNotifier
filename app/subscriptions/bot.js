var LogMe = require('../util/logMe');
var request = require('request-promise');
var Promise = require('bluebird');
var _ = require('lodash');
var carNotifierDb = require('../carNotifierDb');
var enums = require('../enums');
var adsCollection;
var user;

function Bot(_user) {
    user = _user;
    adsCollection = carNotifierDb.adsCollection;
}

Bot.prototype.start = function () {
    LogMe.log('bot started: ' + user.userId);

    getCarsQuery(user)
        .then(getCarsList)
        .then(getNewCarsList)
        .then(getCarsDetails)
};

function getCarsQuery(user) {
    var options = {
        uri: "https://auto.ria.com/blocks_search_ajax/search/",
        qs: getQuery(user)
    };

    return Promise.resolve(options);

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
            po_yers: [],
            top: enums.Query.TOP.TODAY
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

function getNewCarsList(carIds) {
    var query = { userId: user.userId };

    return adsCollection
        .findOne(query)
        .then(processAds)
        .then(updateUserAds);

    function processAds(item) {
        var newIds = [];
        carIds.forEach(function(id) {
           if (item.list.indexOf(id) === -1) {
               newIds.push(id);
           }
        });
        return Promise.resolve(newIds);
    }

    function updateUserAds(newIds) {
        if (!newIds.length) {
            return Promise.resolve([]);
        }
        return adsCollection
            .update(query, { $set: { list: newIds } })
            .then(function() {
                return Promise.resolve(newIds);
            });
    }
}

function getCarsDetails(newCarIds) {
    Promise.all(newCarIds.map(getCarById))
        .then(processDetails);

    function getCarById(id) {
        var options = { uri: "http://auto.ria.com/demo/bu/searchPage/v2/view/auto/" + id };
        return request(options);
    }

    function processDetails(carDetails) {
        carDetails.map(function(response) {
            var carData = processResponse(response);

            LogMe.log('**********************************');
            LogMe.log("* User:        " + user.userId);
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