/**
 * Created by songyang on 12/10/16.
 */

var rest, mime, client;

rest = require('rest'), mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

var auth;
var agency;
var pet;
var adopter;

// client({
//     path: 'https://pet-adoption-webservice.herokuapp.com/users/create',
//     method: 'POST',
//     entity: {
//         "username": "aaa",
//         "password": "1234",
//         "email": "aaa@agency.com"
//     },
//     headers: {
//         "Content-Type": "application/json"
//     }
// }).then(function (response) {
//     console.log('response: ', response.entity);
// });


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
        path: 'https://pet-adoption-webservice.herokuapp.com/agencies/all',
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + auth.token
        }
    }).then(function (response) {
        // console.log('response: ', response.entity);
        // create agency
        client({
            path: 'https://pet-adoption-webservice.herokuapp.com/agencies/create',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + auth.token
            },
            entity: {
                "username": "testAgency3",
                "password": "testAgency3",
                "email": "testAgency3@agency.com",
                "address": "113 Cherry St Seattle, WA 98104",
                "company_name": "Seattle Animal, Inc"
            }
        }).then(function (response) {
            // console.log('response: ', response.entity);
            agency = response.entity;
            // console.log('agency id' + response);
            client({
                path: 'https://pet-adoption-webservice.herokuapp.com/agencies/find',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + auth.token
                },
                entity: {
                    "agency_id": agency.id
                }
            }).then(function (response) {
                // console.log('response: ', response.entity);
                client({
                    path: 'https://pet-adoption-webservice.herokuapp.com/agencies/update',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + auth.token
                    },
                    entity: {
                        "agency_id": agency.id,
                        "address": "113 Broad St Seattle, WA 98104"
                    }
                }).then(function (response) {
                    // console.log('response: ', response.entity);
                    client({
                        path: 'https://pet-adoption-webservice.herokuapp.com/agencies/delete',
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + auth.token
                        },
                        entity: {
                            "agency_id": agency.id
                        }
                    }).then(function (response) {
                        console.log("success");
                    });
                });
            });
        });

    });

});

// client({
//     path: 'https://pet-adoption-webservice.herokuapp.com/agencies/all',
//     method: 'GET',
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Token " + auth.token.stringify
//     }
// }).then(function (response) {
//     console.log('response: ', response);
// });