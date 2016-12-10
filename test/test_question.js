var chai = require('chai');

const request = require('supertest');
const app = require('../server.js');
const expect = require('chai').expect;
const should = chai.should();

describe('Questions', function () {
    var user;
    var question;

    before(function (done) {
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
                "notifications": []
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                user = res.body;
                //console.log(user);
            })
            .end(done);
    });

    describe("Create a new question", function () {
        it('Success after creating a question', function (done) {
            request(app)
                .post('/msdapi/project/user/' + user._id + '/question')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({
                    "title": "How can I adopt a cat?",
                    "content": "Could anyone show me the steps to adopt a pet?"
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.an('object');
                    question = res.body;
                })
                .end(done);
        });
    });

    describe("Get an existing question", function () {
        it('Success after retriving a question', function (done) {
            request(app)
                .get('/msdapi/project/question/' + question._id)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({
                    "title": "How can I adopt a dog?",
                    "content": "Could anyone show me the steps to adopt a dog?"
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

    describe("Delete a question", function () {
        it('Success after deleting a question', function (done) {
            request(app)
                .delete('/msdapi/project/question/' + question._id)
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

    after(function (done) {
        request(app)
            .delete('/msdapi/project/user/' + user._id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });
});