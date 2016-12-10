/**
 * Created by songyang on 12/10/16.
 */

var rest, mime, client;

rest = require('rest'), mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

var auth;

client({
    path: 'https://pet-adoption-webservice.herokuapp.com/users/create',
    method: 'POST',
    entity: {
        "username": "aaa",
        "password": "1234",
        "email": "bquser@gmail.com"
    },
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (response) {
    console.log('response: ', response.entity);
});


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
    console.log('response: ', response.entity);
});

client({
    path: 'https://pet-adoption-webservice.herokuapp.com/agencies/all',
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "token": auth.token
    }
}).then(function (response) {
    console.log('response: ', response);
});