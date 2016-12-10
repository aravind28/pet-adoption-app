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

describe('Create a new user', function () {
    it('Success after sending a user', function (done) {
        request(app)
            .post('/msdapi/project/user/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                username: 'user1',
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


describe('Update a user', function () {
    it('Success after sending a user', function (done) {
        request(app)
            .put('/msdapi/project/user/584b4a026f2123baf1cd50fc')
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