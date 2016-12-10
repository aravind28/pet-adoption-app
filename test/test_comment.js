var chai = require('chai');

const request = require('supertest');
const app = require('../server.js');
const expect = require('chai').expect;
const should = chai.should();

describe('Comments', function () {
    var adminUser;
    var pet;
    var comment;

    before(function (done) {
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
                //console.log(res);
                expect(res.body).to.be.an('object');
                adminUser = res.body;
            })
            .end(done);
    });

    before(function(done) {
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

    describe('Create a comment', function() {
        it('Succeed after creating a comment', function(done) {
            var commentBody = {
                "userId" : adminUser._id,
                "comments" : "Comments",
                "emails" : "emails"
            };

            request(app)
                .post("/msdapi/project/pet/" + pet._id + "/comments")
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(commentBody)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    comment = res.body;
                })
                .end(done);
        });
    });

    describe('Get a comment', function() {
        it('Succeed after retrieving a comment', function(done) {
            request(app)
                .get('/msdapi/project/comments/' + comment._id)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                })
                .end(done);
        });
    });

    describe('Get comments of a pet', function() {
        it('Succeed after retrieving comments of a pet', function(done) {
            request(app)
                .get('/msdapi/project/pet/' + pet._id + '/comments')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('array');
                })
                .end(done);
        });
    });

    describe('Get comments of a user', function() {
        it('Succeed after retrieving comments of a user', function(done) {
            request(app)
                .get('/msdapi/project/user/' + adminUser._id + '/comments')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('array');
                })
                .end(done);
        });
    });

    after(function (done) {
        request(app)
            .delete('/msdapi/project/pet/' + pet._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                "userId": adminUser._id
            })
            .expect(200)
            .expect('Content-Type', /json/);

        request(app)
            .delete('/msdapi/project/user/' + adminUser._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });
});