var should = require('should');
var request = require('supertest');
var ads = require('./ads.json');

describe('adsService', function() {
    var _userId = ads[0].userId;
    var _carId = ads[0].carId;

    before(function(done) {
        app.db.adsCollection.insert(ads)
            .then(function() {
                done();
            });
    });

    after(function(done) {
        app.db.adsCollection.remove()
            .then(function() {
                done();
            });
    });

    describe('rest api', function() {
        it('should successfully get new ads', function(done){
            request(app)
                .get('/user/' + _userId + '/query/' + _carId + '/ads/new')
                .expect(200)
                .expect(function(res) {
                    var ads = res.body.ads;
                    ads.should.be.an.array;
                    ads.length.should.not.equal(0);
                })
                .end(done);
        });

        it('should successfully not get viewed ads one more time', function(done){
            request(app)
                .get('/user/' + _userId + '/query/' + _carId + '/ads/new')
                .expect(200)
                .expect(function(res) {
                    var ads = res.body.ads;
                    ads.should.be.an.array;
                    ads.length.should.equal(0);
                })
                .end(done);
        });
    });
});

/**
 * Created by philips on 8/20/15.
 */
