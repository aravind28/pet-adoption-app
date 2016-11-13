var assert = require('assert');

var app = require("../../server.js").app;

describe('User Service', function(){
    describe('Create User', function(){
        it('should create a user when calling the createUser API and pass in a user object', function(){
            var newUser = {
                        username : 'username',
                        password : 'password',        
                        firstName : 'firstname',
                        lastName : 'lastname',
                        roles : 'roles',
                        emails : 'emails',
                        phones : 'phones'
                    };
            app.post('/msdapi/project/user', newUser);
            
        });
    });
});