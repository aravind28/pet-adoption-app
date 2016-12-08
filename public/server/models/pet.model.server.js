var q = require('q')

module.exports = function (app, db, mongoose, userModel) {
    var PetSchema = require("./pet.schema.server.js")(app, mongoose);
    var PetModel = mongoose.model("PetModel", PetSchema);
    var UserSchema2 = require("./user.schema.server.js")(app, mongoose);
    var UserModel2 = mongoose.model("UserModel2", UserSchema2);

    var api = {
        createPet: createPet,
        deletePet: deletePet,
        updatePet: updatePet,
        findPetById: findPetById,
        listAllPets: listAllPets,
        createFavoriteList: createFavoriteList,
        notifyUsers: notifyUsers,
        getPetByAvailability: getPetsByAvailability,
        getPetsByCategory: getPetsByCategory
    };

    function createPet(newPet) {
        var deferred = q.defer();
        UserModel2.findOne({_id: newPet.userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    if (doc.roles === "admin") {
                        PetModel.create(newPet, function (err, results) {
                            deferred.resolve(results);
                        });
                    }
                    else {
                        deferred.resolve(null);
                    }
                }
            });
        return deferred.promise;
    }

    function deletePet(petId, userId) {
        var deferred = q.defer();
        UserModel2.findOne({_id: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    if (doc.roles === "admin") {
                        PetModel.remove({_id: petId}, function (err, results) {
                            deferred.resolve(results);
                        });
                    }
                    else {
                        deferred.resolve(null);
                    }
                }
            });
        return deferred.promise;
    }

    function updatePet(userId, petId, newPet) {
        var deferred = q.defer();
        UserModel2.findOne({_id: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    if (doc.roles === "admin") {
                        PetModel.update(
                            {_id: petId},
                            {
                                $set: {
                                    petName: newPet.petName,
                                    petGender: newPet.petGender,
                                    petAge: newPet.petAge,
                                    petCategory: newPet.petCategory,
                                    petAvailability: newPet.petAvailability,
                                    adoptedBy: newPet.adoptedBy,
                                    favorites: newPet.favorites,
                                    userFavorites: newPet.userFavorites
                                }
                            },
                            function (err, result) {
                                PetModel.findOne({_id: petId}, function (err, result) {
                                    notifyUsers(result);
                                    deferred.resolve(result);
                                });
                            });
                    }
                    else {
                        deferred.resolve(null);
                    }
                }
            });
        return deferred.promise;
    }

    function listAllPets() {
        return PetModel.find();
    }

    function findPetById(petId) {
        return PetModel.findOne({_id: petId});
    }

    function createFavoriteList(userId, pet) {

        var deferred = q.defer();

        PetModel.findOne({petId: pet.petId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }

                if (doc) {
                    // add user to favorites
                    doc.favorites.push(userId);

                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function notifyUsers(pet) {
        watchingUsers = pet.favorites;
        for (var i = 0; i < watchingUsers.length; i++) {
            userModel.findUserById(watchingUsers[i]).then(function (res) {
                res.notifications.push("Information of a watching pet " + pet.petName + " has changed.");
                userModel.updateUser(res._id, res).then(function (res2) {
                });
            });
        }
    }

    function getPetsByAvailability(availability) {
        var deferred = q.defer();
        PetModel.find({"petAvailability": availability}, function (err, results) {
            if (err) {
                throw err;
            }
            deferred.resolve(results);
        });
        return deferred.promise;
    }

    function getPetsByCategory(category) {
        var deferred = q.defer();
        PetModel.find({"petCategory": category}, function (err, results) {
            if (err) {
                throw err;
            }
            deferred.resolve(results);
        });
        return deferred.promise;
    }

    return api;
}