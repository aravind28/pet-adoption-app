module.exports = function(app, mongoose){

	var PetSchema = new mongoose.Schema({
		petName : String,
		petGender : String,
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
	}, {collection: 'pets'});
	return PetSchema
};