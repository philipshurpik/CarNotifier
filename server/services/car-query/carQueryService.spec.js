var should = require('should');
var request = require('supertest');
var users = require('../user/users.json');
var carQueries = require('./car-queries.json');

describe('carQueryService', function() {
    var _userId = 100500;
    var mockUser = users[0];
    var carQuery1 = carQueries[0];
    var carQuery2 = carQueries[1];
    var carQuery3 = carQueries[2];

    before(function(done) {
        app.db.usersCollection.update({_id: _userId}, mockUser, {upsert: true})
            .then(function() {
                done()
            });
    });

    //after(function(done) {
    //    app.db.usersCollection.remove({_id: _userId})
    //        .then(function() { done() });
    //});

    describe('rest api', function() {
        it('should successfully create first carQuery query for user', function(done){
            request(app)
                .put('/user/' + _userId + '/query/'+ 1)
                .send({carQuery: carQuery1})
                .expect(200)
                .expect(function(res) {
                    res.body.status.should.equal("OK");
                    res.body.data.nModified.should.equal(1);
                })
                .end(done);
        });

        it('should successfully add new query for user', function(done){
            request(app)
                .put('/user/' + _userId + '/query/'+ 2)
                .send({carQuery: carQuery2})
                .expect(200)
                .expect(function(res) {
                    res.body.status.should.equal("OK");
                    res.body.data.nModified.should.equal(1);
                })
                .end(done);
        });

        it('should successfully add new query for user one more', function(done){
            request(app)
                .put('/user/' + _userId + '/query/'+ 3)
                .send({carQuery: carQuery3})
                .expect(200)
                .expect(function(res) {
                    res.body.status.should.equal("OK");
                    res.body.data.nModified.should.equal(1);
                })
                .end(done);
        });

        it('should successfully update query for user', function(done){
            carQuery1.marka_id = 100;
            request(app)
                .put('/user/' + _userId + '/query/'+ 1)
                .send({carQuery: carQuery1})
                .expect(200)
                .expect(function(res) {
                    res.body.status.should.equal("OK");
                    res.body.data.nModified.should.equal(1);
                })
                .end(done);
        });

        it('should successfully delete car query for user', function(done){
            request(app)
                .delete('/user/' + _userId + '/query/'+ 1)
                .expect(200)
                .expect(function(res) {
                    res.body.status.should.equal("OK");
                    res.body.data.nModified.should.equal(1);
                })
                .end(done);
        });
    });
});

