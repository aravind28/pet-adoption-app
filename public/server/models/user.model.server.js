var q = require('q')
module.exports = function(app, mongoose, db) {
    var UserSchema = require("./user.schema.server.js")(app, mongoose);
    var UserModel = mongoose.model("user", UserSchema);

    var api = {
        createUser : createUser,
        updateUser : updateUser,
        deleteUser : deleteUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findAllUsers : findAllUsers
    };
    
    function createUser(newUser) {
        var deferred = q.defer();
        UserModel.create(newUser, function(err, results) {
            deferred.resolve(results);
        });
        return deferred.promise;
    }
    
    function updateUser(id, newUser) {
        if(newUser.username == "root"){
            newUser.roles = ["admin"];
        }
        delete newUser ["_id"];

        var deferred = q.defer();
        UserModel.update(
            {_id : id}, 
            {$set : {
                        username : newUser.username,
                        password : newUser.password,        
                        firstName : newUser.firstName,
                        lastName : newUser.lastName,
                        roles : newUser.roles,
                        emails : newUser.emails,
                        phones : newUser.phones,
                        favorites : newUser.favorites,
                        favoritePets : newUser.favoritePets,
                        notifications : newUser.notifications
                    }
            },
            function(err, result) {
                UserModel.findOne({_id : id}, function(err, result) {
                    deferred.resolve(result);
                });
            });
        return deferred.promise;
    }
    
    function deleteUser(id) {
        var deferred = q.defer();
        UserModel.remove({_id : id}, function(err, results) {
            deferred.resolve(results);
        });
        return deferred.promise;
    }
    
    function findUserById(id) {
        var deferred = q.defer();
        UserModel.findOne({_id : id}, function(err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    
    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username : username}, function(err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function findAllUsers(){
        return UserModel.find();
    }
    
    return api;
};