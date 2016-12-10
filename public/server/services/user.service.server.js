/**
 * Created by Akshay on 13-10-2016.
 */

"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel){
    var auth = authorized;

    app.post("/msdapi/project/user/login", passport.authenticate('MSDAPI'), login);
    app.post("/msdapi/project/user/logout", logout);
    app.get("/msdapi/project/user/loggedin", loggedin);
    app.post('/msdapi/project/user', createUser);
    app.put('/msdapi/project/user/:id', updateUser);
    app.get("/msdapi/project/user/:id", getuserbyid);
    app.delete('/msdapi/project/user/:id', deleteUser);
    app.post('/msdapi/project/petfavoritelist', createFavoriteList);
    app.post("/msdapi/project/admin/user", addadmin);
    app.get("/msdapi/project/user", getusers);

    passport.use('MSDAPI', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function createFavoriteList(req, res){
        var userId = req.body.userId;
        var petId = req.body.petId;
        userModel
            .createFavoriteList(userId, petId)
            .then(
                function(user){
                    if(user){
                        res.json(user)
                    }
                    else{
                        res.status(400).send(err);
                    }
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function projectLocalStrategy(username, password, done){
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)){
                        //console.log("hello");
                        return done(null, user);
                    }
                    else{
                        //console.log("Bye");
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

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
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

    //function login(req, res){
    //    var user = req.body;
    //    userModel
    //        .findUserByUsername(user.username)
    //        .then(
    //            function(usr){
    //                if(usr && bcrypt.compareSync(user.password, usr.password)){
    //                    res.json(usr);
    //                }
    //                else{
    //                    res.status(401).send("unauthorized");
    //                }
    //            },
    //
    //            function (err) {
    //                if(err){
    //                    return done(err);
    //                }
    //            }
    //        );
    //    // var user = req.user;
    //    // delete user.password;
    //    // res.json(user);
    //}

    function logout(req, res){
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res){
        res.send(req.isAuthenticated() ? req.user: '0');
    }

    function createUser(req, res) {

        var user = req.body;
        user.roles = 'standard';

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
                function(result){
                    userModel.findAllUsers().then(
                        function(users, err){
                            if (users) {
                                res.status(200);
                                res.jsonp(users);
                            }
                        });
                },
                function (err){
                    if(err){
                        res.staus(400).send(err);
                    }

                }
            );
    }

    function addadmin(req, res) {

        var user = req.body;
        user.roles = "admin";

        userModel
            .findUserByUsername(user.username)
            .then(
                function (usr) {
                    if(usr){
                        res.json(null);
                    }
                    else{
                        user.password = bcrypt.hashSync(user.password);
                        userModel.createAdminUser(user).then(function (result) {
                                res.json(result);
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


        //if (isAdmin(req.user)) {
        //    userModel
        //        .findUserByUsername(user.username)
        //        .then(
        //            function (usr) {
        //                if (usr) {
        //                    res.json(null);
        //                }
        //                else {
        //                    user.password = bcrypt.hashSync(user.password);
        //                    userModel.createUser(user)
        //                        .then(
        //                            function (doc) {
        //                                res.json(doc);
        //                            }
        //                        );
        //                }
        //            },
        //
        //            function (err) {
        //                res.status(400).send(err);
        //            }
        //        )
        //        .then(
        //            function (user) {
        //                if (user) {
        //                    req.login(user, function (err) {
        //                        if (err) {
        //                            res.status(400).send(err);
        //                        }
        //                        else {
        //                            res.json(user);
        //                        }
        //                    });
        //                }
        //            },
        //            function (err) {
        //                res.status(400).send(err);
        //            }
        //        );
        //}
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

    function getuserbyid(req, res){
        userModel
            .findUserById(req.params.id)
            .then(
                function (user) {
                    res.json(user);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }
}