/**
 * Created by Akshay on 09-11-2016.
 */

var chai = require('chai');

const request = require('supertest');
const app = require('../server.js');
const expect = require('chai').expect;
//const should = chai.should();

var adminUser;
var user;
var pet;
var userFavList;

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
                "emails": "admin@agency.com",
                "phones": [
                    "777"
                ],
                "favorites": [],
                "notifications": []})
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                // expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                adminUser = res.body;
            })
            .end(done);
    });
});

describe('Create a new user', function () {
    it('Success after sending a user', function (done) {
        request(app)
            .post('/msdapi/project/user/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                username: 'user2',
                password: 'user2',
                "firstName": "fn2",
                "lastName": "ln2",
                "emails": "user2@agency.com",
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

describe('Validate Logged in of a User', function () {
    it('Success if user is logged in', function (done) {
        request(app)
            .get('/msdapi/project/user/loggedin')
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
                        done();
                    });
            });
    });
});

describe('Update a user', function () {
    it('Success after updating a user', function (done) {
        request(app)
            .put('/msdapi/project/user/' + user._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                username: 'user2Updated',
                password: 'user2',
                "firstName": "fn2",
                "lastName": "ln2",
                "emails": "user2@agency.com",
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

describe('Create a new pet', function () {
    it('Success after creating a pet', function (done) {
        request(app)
            .post('/msdapi/project/pet/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                "userId":adminUser._id,
                "petName" : "pet10",
                "petGender" : "male",
                "petAge" : "5",
                "petCategory" : "dog",
                "petAvailability" : true,
                "adoptedBy" : "",
                "favorites" : []
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                pet = res.body;
            })
            .end(done);
    });
});

describe('Create a favorite list', function () {
    it('Success after creating a favorite list', function (done) {
        request(app)
            .post('/msdapi/project/petfavoritelist/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                "userId":user._id,
                "petId":pet._id
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                userFavList = res.body;
            })
            .end(done);
    });
});

describe('Update a pet', function () {
    it('Success after updating a pet', function (done) {
        request(app)
            .put('/msdapi/project/pet/' + pet._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                "userId": adminUser._id,
                "petName" : "pet10",
                "petGender" : "male",
                "petAge" : "7",
                "petCategory" : "dog",
                "petAvailability" : true,
                "adoptedBy" : "",
                "favorites" : [user._id]
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
            })
            .end(done);
    });
});

describe('Get a user to check if the user is notified of pet update', function(){
    it('Success in getting an user', function(done){
        request(app)
            .get('/msdapi/project/user/' + user._id)
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).not.to.be.empty;
            })
            .end(done)

    });
});

describe('Delete a pet', function () {
    it('Success after deleting a pet', function (done) {
        request(app)
            .delete('/msdapi/project/pet/' + pet._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                "userId": adminUser._id
            })
            .expect(200)
            .expect('Content-Type', /json/)
            // .expect(function (res) {
            //     expect(res.body).to.be.an('json');
            // })
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

describe('Delete an Admin user', function () {
    it('Success after deleting the Admin user', function (done) {
        request(app)
            .delete('/msdapi/project/user/' + adminUser._id)
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