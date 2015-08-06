var should = require('should');
var request = require('supertest');
var users = require('./users.json');

describe('user service', function(){

    var id = 10234;
    var mockUser = users[0];
    mockUser.userId = id;

    before(function(done) {
        app.db.usersCollection.remove()
            .then(function() { done() });
    });

    describe('rest api', function() {
        it('should unable to get user if it not exists', function(done){
            request(app)
                .get('/user/' + id)
                .expect(404)
                .end(done);
        });

        it('should successfully put new user', function(done){
            request(app)
                .put('/user/' + id)
                .send(mockUser)
                .expect(200, done);
        });

        it('should successfully get user', function(done){
            request(app)
                .get('/user/' + id)
                .expect(200)
                .expect(function(res) {
                    res.body.should.have.property('_id');
                    res.body.userId.should.equal(mockUser.userId);
                })
                .end(done);
        });

        it('should successfully put existing user', function(done){
            request(app)
                .put('/user/' + id)
                .send(mockUser)
                .expect(200, done);
        });

        it('should successfully get user', function(done){
            request(app)
                .get('/user/' + id)
                .expect(200)
                .expect(function(res) {
                    res.body.should.have.property('_id');
                    res.body.userId.should.equal(mockUser.userId);
                })
                .end(done);
        });
    });



});