var should = require('should');
var request = require('supertest');
var users = require('../user/users.json');
var carQueries = require('./car-queries.json');

describe('carQueryService', function() {
    var id = 100500;
    var mockUser = users[0];
    mockUser.userId = id;
    var carQuery1 = carQueries[0];
    var carQuery2 = carQueries[1];
    var resultCarQuery;

    before(function(done) {
        app.db.usersCollection.save(mockUser)
            .then(function() { done() });
    });

    describe('rest api', function() {
        it('should successfully create first carQuery query for user', function(done){
            request(app)
                .post('/user/' + id + '/query')
                .send({carQuery: carQuery1})
                .expect(200)
                .expect(function(res) {
                    var user = res.body.user;
                    user.cars.length.should.equal(1);
                    resultCarQuery = user.cars[0];
                    Object.keys(carQuery1).forEach(function(key) {
                        resultCarQuery.should.have.property(key);
                    });
                })
                .end(done);
        });

        it('should successfully add new query for user', function(done){
            request(app)
                .post('/query')
                .send({carQuery: carQuery2})
                .expect(200)
                .expect(function(res) {
                    var user = res.body.user;
                    user.cars.length.should.equal(2);
                })
                .end(done);
        });

        it('should successfully update query for user', function(done){
            carQuery1.marka_id = 100;
            request(app)
                .put('/query/' + resultCarQuery.id)
                .send({carQuery: carQuery1})
                .expect(200)
                .expect(function(res) {
                    var user = res.body.user;
                    user.cars[1].marka_id.should.equal(carQuery1.marka_id);
                })
                .end(done);
        });

        it('should successfully delete car query for user', function(done){
            request(app)
                .delete('/query/' + resultCarQuery.id)
                .expect(200)
                .expect(function(res) {
                    var user = res.body.user;
                    user.cars.length.should.equal(1);
                    var resultCarQuery2 = user.cars[0];
                    resultCarQuery2.model_id.should.equal(carQuery2.model_id);
                })
                .end(done);
        });
    });
});

