var q = require('q')
module.exports = function(app, mongoose, db){
	var PetSchema = require("./pet.schema.server.js")(app, mongoose);
	var PetModel = mongoose.model("user", PetSchema);

	var api = {
		createPet : createPet,
		deletePet : deletePet,
		findPetById : findPetById,
		listAllPets : listAllPets,
		createFavoriteList : createFavoriteList
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

	function listAllPets(){
		PetModel.find(function(err, results){
			if(err){
				throw err;
			}
			deferred.resulve(results);
		});
	}

	function findPetById(petId){
		return PetModel.findOne(petId);
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

	return api;
}