var should = require('should');
var request = require('supertest');
var users = require('./users.json');

describe('user service', function(){

    var id = 10234;
    var mockUser = users[0];
    mockUser.userId = id;

    it('should successfully post user', function(done){
        request(app)
            .post('/user/' + id)
            .send(mockUser)
            .expect(200, done);
    });

    it('should have get user', function(done){
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