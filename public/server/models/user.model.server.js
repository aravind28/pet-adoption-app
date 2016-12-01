var q = require('q')
module.exports = function(app, mongoose, db) {
    var UserSchema = require("./user.schema.server.js")(app, mongoose);
    var PetSchema1 = require("./pet.schema.server.js")(app, mongoose); 
    var UserModel = mongoose.model("user", UserSchema);
    var PetModel1 = mongoose.model("petModel1", PetSchema1);

    var api = {
        createUser : createUser,
        updateUser : updateUser,
        deleteUser : deleteUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findAllUsers : findAllUsers,
        findUserByCredentials : findUserByCredentials,
        createFavoriteList : createFavoriteList
    };
    
    function createFavoriteList(userId, petId){

        var deferred = q.defer();

        UserModel.findOne({_id: userId},
            function (err, doc) {
                if(err){
                    console.log("position 1");
                    deferred.reject(err);
                }
                if(doc){
                    console.log("position 2");
                    PetModel1.findOne({_id: petId},
                        
                        function(err, doc2){
                            console.log("position 3");
                            if(err){
                                deferred.reject(err);
                            }
                            if(doc2){
                                doc2.favorites.push(userId);
                                doc2.save(function(err, doc2){
                                    if(err){
                                        deferred.reject(err);
                                    }
                                    else{
                                        // deferred.resolve(doc2);
                                    }
                                })
                            }
                        });
                
                        // add user to favorites
                        doc.favorites.push(petId);
                        doc.save(function (err, doc) {
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }

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
        // var deferred = q.defer();
        return UserModel.remove({_id : id})//, function(err, results) {
            // deferred.resolve({"deleted":"success"});
            // deferred.reject(err);
            // return {"deleted":"success"};
       // });
        // return deferred.promise;
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

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel.findOne({username : username, password : password}, function(err, result) {
            console.log(result);
            deferred.resolve(result);
        });
        return deferred.promise;
    }
    
    return api;
};