var rest, mime, client;

rest = require('rest'), mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

var auth;
var agency;
var pet;
var adopter;
var favAdopter;
var favAgency;
var questionAns;


// Questions and Answer
client({
    path: 'https://pet-adoption-webservice.herokuapp.com/api-token-auth/',
    method: 'POST',
    entity: {
        "username": "aaa",
        "password": "1234"
    },
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (response) {
    auth = response.entity;
    // get authentication token
    client({
        path: 'https://pet-adoption-webservice.herokuapp.com/adopters/all',
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + auth.token
        }
    }).then(function (response) {
        favAdopter = response.entity[0];
        // console.log(response);
        client({
            path: 'https://pet-adoption-webservice.herokuapp.com/agencies/all',
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + auth.token
            }
        }).then(function (response) {
            favAgency = response.entity[0];
            // console.log(response);
            client({
                path: 'https://pet-adoption-webservice.herokuapp.com/questions/create',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + auth.token
                },
                entity: {
                    "adopter_id": favAdopter.id,
                    "agency_id": favAgency.id,
                    "title": "Test question title",
                    "content": "This content was created as a test"
                }
            }).then(function (response) {
                // console.log('response: ', response.entity);
                questionAns = response.entity;
                client({
                    path: 'https://pet-adoption-webservice.herokuapp.com/questions/answer',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + auth.token
                    },
                    entity: {
                        "question_id": questionAns.id,
                        "answer": "Answer for the test question"
                    }
                }).then(function (response) {
                    // console.log(response);
                    client({
                        path: 'https://pet-adoption-webservice.herokuapp.com/questions/all',
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + auth.token
                        }
                    }).then(function (response) {
                        // console.log(response);
                        client({
                            path: 'https://pet-adoption-webservice.herokuapp.com/questions/delete',
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + auth.token
                            },
                            entity: {
                                "question_id": questionAns.id
                            }
                        }).then(function (response) {
                            console.log("success");
                        });
                    });
                });
            });
        });
    });
});




// Updating Question and Delete
client({
    path: 'https://pet-adoption-webservice.herokuapp.com/api-token-auth/',
    method: 'POST',
    entity: {
        "username": "aaa",
        "password": "1234"
    },
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (response) {
    auth = response.entity;
    // get authentication token
    client({
        path: 'https://pet-adoption-webservice.herokuapp.com/adopters/all',
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + auth.token
        }
    }).then(function (response) {
        favAdopter = response.entity[0];
        // console.log(response);
        client({
            path: 'https://pet-adoption-webservice.herokuapp.com/agencies/all',
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + auth.token
            }
        }).then(function (response) {
            favAgency = response.entity[0];
            // console.log(response);
            client({
                path: 'https://pet-adoption-webservice.herokuapp.com/questions/create',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + auth.token
                },
                entity: {
                    "adopter_id": favAdopter.id,
                    "agency_id": favAgency.id,
                    "title": "Test question title",
                    "content": "This content was created as a test"
                }
            }).then(function (response) {
                // console.log('response: ', response.entity);
                questionAns = response.entity;
                client({
                    path: 'https://pet-adoption-webservice.herokuapp.com/questions/update',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + auth.token
                    },
                    entity: {
                        "question_id": questionAns.id,
                        "content": "Updating the content of question for testing purpose"
                    }
                }).then(function (response) {
                    // console.log(response);
                    client({
                        path: 'https://pet-adoption-webservice.herokuapp.com/questions/delete',
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + auth.token
                        },
                        entity: {
                            "question_id": questionAns.id
                        }
                    }).then(function (response) {
                        console.log("success");
                    });
                });
            });
        });
    });
});