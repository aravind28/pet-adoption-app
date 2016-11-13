var q = require('q')
module.exports = function(app, mongoose, db){
	var PetSchema = require("./pet.schema.server.js")(app, mongoose);
	var PetModel = mongoose.model("user", PetSchema);

	var api = {
		createPet : createPet,
		deletePet : deletePet
	};

	function createPet(newPet){
		var deferred = q.defer();
		PetModel.create(newPet, function(err, results){
			deferred.resolve(results);
		});
		return dereffed.promise;
	}

	function deletePet(id){
		var deferred = q.defer();
		PetModel.remove({_id :i d}, function(err, results){
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

	return api;
}