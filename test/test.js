/**
 * Created by Akshay on 09-11-2016.
 */

var chai = require('chai');

const request = require('supertest');
const app = require('../server.js');
const expect = require('chai').expect;
const should = chai.should();

//describe('Validate Login of an Existing User', function () {
//    it('Success if credentials are valid', function (done) {
//        request(app)
//            .post('/msdapi/project/user/login')
//            .set('Accept', 'application/json')
//            .set('Content-Type', 'application/json')
//            .send({username: 'admin', password: 'admin'})
//            .expect(200)
//            .expect('Content-Type', /json/)
//            .expect(function (res) {
//                expect(res.body).not.to.be.empty;
//                expect(res.body).to.be.an('object');
//            })
//            .end(done);
//    });
//});

var user;

describe('Create a new user', function () {
    it('Success after sending a user', function (done) {
        request(app)
            .post('/msdapi/project/user/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                username: 'user2',
                password: 'user2',
                "firstName": "fn5",
                "lastName": "ln5",
                "emails": "name5@name.com",
                "phones": [
                    "206"
                ],
                "favorites": [],
                "notifications": []})
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                user = res.body;
            })
            .end(done);
    });
});

describe('Validate Login of an Existing User', function () {
    it('Success if credentials are valid', function (done) {
        request(app)
            .post('/msdapi/project/user/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({username: 'user2', password: 'user2'})
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
            })
            .end(done);
    });
});

describe('Update a user', function () {
    it('Success after updating a user', function (done) {
        request(app)
            .put('/msdapi/project/user/' + user._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                username: 'user1Updated',
                password: 'user1',
                "firstName": "fn5",
                "lastName": "ln5",
                "emails": "name5@name.com",
                "phones": [
                    "206"
                ],
                "favorites": [],
                "notifications": []})
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
            })
            .end(done);
    });
});

describe('Delete a user', function () {
    it('Success after deleting a user', function (done) {
        request(app)
            .delete('/msdapi/project/user/' + user._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).to.be.an('array');
            })
            .end(done);
    });
});

describe('Validate Login of a non Existing User', function () {
    it('Success if it does not log in', function (done) {
        request(app)
            .post('/msdapi/project/user/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({username: 'user2', password: 'user2'})
            .expect(401)
            .end(done);
    });
});

describe('Create a new Admin user', function () {
    it('Success if a new Admin user is created', function (done) {
        request(app)
            .post('/msdapi/project/admin/user/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                username: 'admin',
                password: 'admin',
                "firstName": "admin",
                "lastName": "admin",
                "emails": "admin@admin.com",
                "phones": [
                    "777"
                ],
                "favorites": [],
                "notifications": []})
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                user = res.body;
            })
            .end(done);
    });
});

describe('Delete an Admin user', function () {
    it('Success after deleting the Admin user', function (done) {
        request(app)
            .delete('/msdapi/project/user/' + user._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                //expect(res.body).to.be.an('null');
                expect('null');
            })
            .end(done);
    });
});


//describe('Validate Logout of a Logged-in User', function () {
//    it('Success if Logs-Out', function (done) {
//        request(app)
//            .get('/msdapi/project/user/logout')
//            .end(function (err, res) {
//                if(err) return done(err);
//
//                request(app)
//                    .get('/')
//                    .end(function (err, res) {
//                        if(err) return done(err);
//                        res.text.should.include('login');
//                        done();
//                    });
//            });
//    });
//});