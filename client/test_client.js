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
var favAdopter;
var favPet;

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


// agency
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


// adopter
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
        agency = response.entity[0];
        // console.log(agency.id);
        client({
            path: 'https://pet-adoption-webservice.herokuapp.com/adopters/create',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + auth.token
            },
            entity: {
                "username": "adopter2",
                "password": "adopter2",
                "email": "adopter2@agency.com",
                "address": "721 Pine St, Seattle, WA 98101",
                "first_name": "First_Name",
                "last_name": "Last_Name"
            }
        }).then(function (response) {
            adopter = response.entity;
            client({
                path: 'https://pet-adoption-webservice.herokuapp.com/adopters/update',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + auth.token
                },
                entity: {
                    "adopter_id": adopter.id,
                    "last_name": "Last_Name_Updated"
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
                        "adopter_id": adopter.id
                    }
                }).then(function (response) {
                    console.log("success2");
                });
            });
        });
    });
});


// pet
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
        agency = response.entity[0];
        console.log(agency.id);
        client({
            path: 'https://pet-adoption-webservice.herokuapp.com/pets/create',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + auth.token
            },
            entity: {
                "pet_name": "pet2",
                "description": "Dog; Age:3; Gender:Female; Species:Husky;",
                "agency_id": agency.id
            }
        }).then(function (response) {
            pet = response.entity;
            client({
                path: 'https://pet-adoption-webservice.herokuapp.com/pets/update',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + auth.token
                },
                entity: {
                    "pet_id": pet.id,
                    "description": "Dog; Age:5; Gender:Female; Species:Husky;"
                }
            }).then(function (response) {
                // console.log('response: ', response.entity);
                client({
                    path: 'https://pet-adoption-webservice.herokuapp.com/pets/delete',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + auth.token
                    },
                    entity: {
                        "pet_id": pet.id
                    }
                }).then(function (response) {
                    console.log("success3");
                });
            });
        });
    });
});
