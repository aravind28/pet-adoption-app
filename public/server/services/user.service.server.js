var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel){
 
    app.post('/api/project/user', createUser);
    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUser);
    
    function createUser(req, res) {
        var newUser = req.body;
        model.createUser(newUser).then(function(result) {
            res.jsonp(result); 
        });
    }
    
    function updateUser(req, res) {
        var id = req.params.id;
        var updated_user = req.body;
        model.updateUser(id, updated_user).then(function(result) {
            res.jsonp(result); 
        });
    }
    
    function deleteUser(req, res) {
        var id = req.params.id;
        model.deleteUser(id);
        model.findAllUser().then(function(result) {
            res.jsonp(result); 
        });
    }
}