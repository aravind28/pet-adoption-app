/**
 * Created by Akshay on 13-10-2016.
 */

"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel){
    var auth = authorized;

    app.post("/msdapi/project/user/login", login);
    app.post("/msdapi/project/user/logout", logout);
    app.get("/msdapi/project/user/loggedin", loggedin);
    app.post('/msdapi/project/user', createUser);
    app.put('/msdapi/project/user/:id', updateUser);
    app.post('/msdapi/project/petfavoritelist', createFavoriteList);
    app.delete('/msdapi/project/user/:id', deleteUser);
    app.post("/msdapi/project/admin/user", auth, addadmin);
    app.get("/msdapi/project/admin/user", getusers);
    app.put("/msdapi/project/admin/user/:id", auth, adminupdate);

    passport.use('MSDAPI', new LocalStrategy(projectLocalStrategy));

    function createFavoriteList(req, res){
        var userId = req.body.userId;
        var petId = req.body.petId;
        console.log(userId, petId);
        userModel.createFavoriteList(userId, petId)
    }

    function projectLocalStrategy(username, password,done){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user && bcrypt.compareSync(password, user.password)){
                        return done(null, true);
                    }
                    else{
                        return done(null, false);
                    }
                },

                function (err) {
                    if(err){
                        return done(err);
                    }
                }
            );
    }

    function authorized(req, res, next){
        if(!req.isAuthenticated()){
            res.send(401);
        }
        else{
            next();
        }
    }

    function isAdmin(user){
        if(user.roles.indexOf('admin') > -1){
            return true;
        }
        return false;
    }

    function login(req, res){
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function(usr){
                    if(usr && bcrypt.compareSync(user.password, usr.password)){
                        res.json(usr); 
                    }
                    else{
                        res.status(401).send("unauthorized"); 
                    }
                },

                function (err) {
                    if(err){
                        return done(err);
                    }
                }
            );
        // var user = req.user;
        // delete user.password;
        // res.json(user);
    }

    function logout(req, res){
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res){
        res.send(req.isAuthenticated() ? req.user: '0');
    }
    
    function createUser(req, res) {

        var user = req.body;
        user.roles = ['standard'];

        userModel
            .findUserByUsername(user.username)
            .then(
                function (usr) {
                    if(usr){
                        res.json(null);
                    }
                    else{
                        user.password = bcrypt.hashSync(user.password);
                        userModel.createUser(user).then(function(result){
                            res.jsonp(result);
                        });     
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    
    function updateUser(req, res) {
        var id = req.params.id;
        console.log(id);
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        userModel.updateUser(id, newUser).then(function(result) {
            res.jsonp(result); 
        });
    }
    
    function deleteUser(req, res) {

        // if(isAdmin(req.user)){
            userModel
                .deleteUser(req.params.id)
                .then(
                    function(){
                        userModel.findAllUsers();
                    },
                    function (err){
                        if(err){
                            res.staus(400).send(err);
                        }
                      
                    }
                )
                .then(
                    function(user){
                        res.status(200);
                    });
        // }
        // else{
        //     res.status(403);
        // }
    }

    function addadmin(req, res) {
        var user = req.body;

        if (isAdmin(req.user)) {
            userModel
                .findUserByUsername(user.username)
                .then(
                    function (usr) {
                        if (usr) {
                            res.json(null);
                        }
                        else {
                            user.password = bcrypt.hashSync(user.password);
                            userModel.createUser(user)
                                .then(
                                    function (doc) {
                                        res.json(doc);
                                    }
                                );
                        }
                    },

                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (user) {
                        if (user) {
                            req.login(user, function (err) {
                                if (err) {
                                    res.status(400).send(err);
                                }
                                else {
                                    res.json(user);
                                }
                            });
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function getusers(req, res){
        // if(isAdmin(req.user)){
            userModel
                .findAllUsers()
                .then(
                    function (user) {
                        //console.log(res.json(user));
                        res.json(user);
                    },

                    function () {
                        res.status(400).send(err);
                    }
                );
        // }
        // else{
            // res.status(403);
        // }
    }

    function adminupdate(req, res){
        var user = req.body;
        if(!isAdmin(req.user)){
            delete user.roles;
        }
        if(typeof user.roles == "string"){
            user.roles = user.roles.split(",");
        }

        if(user.password.length > 0) {
            user.password = bcrypt.hashSync(user.password);
        }
        else{
            delete user.password;
        }

        userModel
            .updateUser(req.params.id, user)
            .then(
                function (updateduser) {
                    res.json(updateduser);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },

                function(err){
                    res.status(400).send(err);
                }
            );
    }
}