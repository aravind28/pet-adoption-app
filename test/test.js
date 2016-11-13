/**
 * Created by Akshay on 09-11-2016.
 */

const request = require('supertest');
const app = require('./server.js');
const expect = require('chai').expect;

describe('Validate Login of an Existing User', function () {
    it('Success if credentials are valid', function (done) {
        request(app)
            .post('/msdapi/project/user/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({username: 'admin', password: 'admin'})
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
            })
            .end(done);
    });
});


describe('Validate Logout of a Logged-in User', function () {
    it('Success if Logs-Out', function (done) {
        request(app)
            .get('/msdapi/project/user/logout')
            .end(function (err, res) {
                if(err) return done(err);

                request(app)
                    .get('/')
                    .end(function (err, res) {
                        if(err) return done(err);
                        res.text.should.include('login');
                        done();
                    });
            });
    });
});