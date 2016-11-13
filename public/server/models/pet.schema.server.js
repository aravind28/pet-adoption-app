module.exports = function(mongoose){
	var PetSchema = mongoose.Schema({
		petName : String,
		petGenger : String,
		petAge : Number,
		petCategory : String,
		petAvailability : String,
		petStarredBy : [String],
		// id's of users who like this pet
		favorites: [String],
		// list of users that like this pet
		userFavorites: [
			{username: String}
		]
	});
	return PetSchema
};