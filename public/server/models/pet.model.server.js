var q = require('q')

<<<<<<< HEAD
module.exports = function(app, db, mongoose, userModel){
	var PetSchema = require("./pet.schema.server.js")(app, mongoose);
=======
module.exports = function(app, db, mongoose){
	var PetSchema = require("./pet.schema.server.js")(app, mongoose);

>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5
	var PetModel = mongoose.model("PetModel", PetSchema);

	var api = {
		createPet : createPet,
		deletePet : deletePet,
<<<<<<< HEAD
        updatePet : updatePet,
		findPetById : findPetById,
		listAllPets : listAllPets,
		createFavoriteList : createFavoriteList,
        notifyUsers : notifyUsers
=======
		findPetById : findPetById,
		listAllPets : listAllPets,
		createFavoriteList : createFavoriteList
>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5
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
<<<<<<< HEAD
    
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
=======
>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5

	function listAllPets(){
		PetModel.find(function(err, results){
			if(err){
				throw err;
			}
			deferred.resulve(results);
		});
	}

	function findPetById(petId){
<<<<<<< HEAD
		return PetModel.findOne({_id : petId});
=======
		return PetModel.findOne(petId);
>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5
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
<<<<<<< HEAD
    
    function notifyUsers(pet) {
        watchingUsers = pet.favorites;
        for (var i = 0; i < watchingUsers.length; i++) {
            userModel.findUserById(watchingUsers[i]).then(function(res){
                res.notifications.push("Information of a watching pet " + pet.petName + " has changed.");
                userModel.updateUser(res._id, res).then(function(res2){});
            });
        }
    }
    
=======

>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5
	return api;
}