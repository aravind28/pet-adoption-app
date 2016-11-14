var q = require('q')

module.exports = function(app, db, mongoose, userModel){
	var PetSchema = require("./pet.schema.server.js")(app, mongoose);
	var PetModel = mongoose.model("PetModel", PetSchema);

	var api = {
		createPet : createPet,
		deletePet : deletePet,
        updatePet : updatePet,
		findPetById : findPetById,
		listAllPets : listAllPets,
		createFavoriteList : createFavoriteList,
        notifyUsers : notifyUsers,
        getPetByAvailability : getPetsByAvailability,
		getPetsByCategory : getPetsByCategory
	};

	function createPet(newPet){
		var deferred = q.defer();
		PetModel.create(newPet, function(err, results){
			deferred.resolve(results);
		});
		return deferred.promise;
	}

	function deletePet(id){
		var deferred = q.defer();
		PetModel.remove({_id :id}, function(err, results){
			deferred.resolve(results);
		});
		return deferred.promise;
	}
    
    function updatePet(petId, newPet) {
        var deferred = q.defer();  
        PetModel.update(
            {_id : petId}, 
            {$set : {
                        petName : newPet.petName,
                        petGender : newPet.petGender,        
                        petAge : newPet.petAge,
                        petCategory : newPet.petCategory,
                        petAvailability : newPet.petAvailability,
                        adoptedBy : newPet.adoptedBy,
                        favorites : newPet.favorites,
                        userFavorites : newPet.userFavorites
                    }
            },
            function(err, result) {
                PetModel.findOne({_id : petId}, function(err, result) {
                    deferred.resolve(result);
                });
            });
        return deferred.promise;
    }

	function listAllPets(){
		PetModel.find(function(err, results){
			if(err){
				throw err;
			}
			deferred.resulve(results);
		});
	}

	function findPetById(petId){
		return PetModel.findOne({_id : petId});
	}

	function createFavoriteList(userId, pet){

		var deferred = q.defer();

		PetModel.findOne({petId: pet.petId},
			function (err, doc) {
				if(err){
					deferred.reject(err);
				}

				if(doc){
					// add user to favorites
					doc.favorites.push(userId);

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
    
    function notifyUsers(pet) {
        watchingUsers = pet.favorites;
        for (var i = 0; i < watchingUsers.length; i++) {
            userModel.findUserById(watchingUsers[i]).then(function(res){
                res.notifications.push("Information of a watching pet " + pet.petName + " has changed.");
                userModel.updateUser(res._id, res).then(function(res2){});
            });
        }
    }

    function getPetsByAvailability(){
		PetMode.find({"petAvailability" : True}, function(err, results){
			if(err){
				throw err;
			}
			deferred.resolve(results);
		});
		return deferred.promise;
	}

	function getPetsByCategory(category){
		PetModel.find({"petCategory" : category}, function(err, results){
			if(err){
				throw err;
			}
			deferred.resolve(results);
		});
		return deferred.promise;
	}
    
	return api;
}