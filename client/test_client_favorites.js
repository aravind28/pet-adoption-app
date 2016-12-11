var rest, mime, client;

rest = require('rest'), mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

var auth;
var agency;
var pet;
var adopter;
var favAdopter;
var favPet;


// set favorite
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
            path: 'https://pet-adoption-webservice.herokuapp.com/pets/all',
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + auth.token
            }
        }).then(function (response) {
            favPet = response.entity[0];
            // console.log(response);
            client({
                path: 'https://pet-adoption-webservice.herokuapp.com/adopters/set_favorite',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + auth.token
                },
                entity: {
                    "adopter_id": favAdopter.id,
                    "favorite_pet_id": favPet.id
                }
            }).then(function (response) {
                // console.log('response: ', response);
                client({
                    path: 'https://pet-adoption-webservice.herokuapp.com/adopters/find',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + auth.token
                    },
                    entity: {
                        "adopter_id": favAdopter.id
                    }
                }).then(function (response) {
                    console.log(response);
                });
            });
        });
    });
});