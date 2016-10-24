var q = require('q')
module.exports = function(app, mongoose, db){
	var PetSchema = require("./user.scheme.js")(app, mongoose);
	var PetModel = mongoose.model("user", UserSchema);

	var api = {
		createPet : createPet,
		deletePet : deletePet
	};

	function createPet(newPet){
		var deferred = q.defer();
		UserMode.create(newPet, function(err, results){
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

	return api;
}