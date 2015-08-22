var Reflux = require('reflux');
var actions = require('../actions');
var request = require('superagent');

var adsStore = Reflux.createStore({
    ads: null,
    adsDetails: null,

    init() {
        this.ads = [];
        this.adsDetails = [];
        this.listenTo(actions.getAds, this.getAds.bind(this));
    },

    getAds(carQueryId) {
        var userId = 100500;
        var url = "http://localhost:1906/user/" + userId + '/query/' + carQueryId + '/ads/all';

        request.get(url, function(err, response) {
            this.ads = response.body.ads;
            this.getDetails(this.ads);
        }.bind(this));
    },

    getDetails(ads) {
        this.adsDetails = [];
        ads.forEach((ad) => {
            var url = "https://auto.ria.com/demo/bu/searchPage/v2/view/auto/" + ad.riaId;
            request.get(url, (err, response) => {
                if (err) {
                    this.adsDetails.push({
                        id: ad.riaId,
                        title: "CORS: some title"
                    });
                    return;
                }

                var result = response.body;

                this.adsDetails.push({
                    id: ad.riaId,
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
                });
            });
        });

        var interval = setInterval(() => {
            if (this.ads.length === this.adsDetails.length) {
                clearInterval(interval);
                this.trigger({adsDetails: this.adsDetails});
            }
        }, 10);
    }
});

module.exports = adsStore;