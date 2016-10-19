var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel){
 
    app.post('/msdapi/project/user', createUser);
    app.put('/msdapi/project/user/:id', updateUser);
    app.delete('/msdapi/project/user/:id', deleteUser);
    
    function createUser(req, res) {
        var newUser = req.body;
        model.createUser(newUser).then(function(result) {
            res.jsonp(result); 
        });
    }
    
    function updateUser(req, res) {
        var id = req.params.id;
        var newUser = req.body;
        model.updateUser(id, newUser).then(function(result) {
            res.jsonp(result); 
        });
    }
    
    function deleteUser(req, res) {
        var id = req.params.id;
        model.deleteUser(id);
    }
}