module.exports = function(app, mongoose){

	var PetSchema = new mongoose.Schema({
		petName : String,
		petGender : String,
		petAge : Number,
		petCategory : String,
<<<<<<< HEAD
		petAvailability : Boolean,
        adoptedBy : String,
=======
		petAvailability : String,
		petStarredBy : [String],
>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5
		// id's of users who like this pet
		favorites: [String],
		// list of users that like this pet
		userFavorites: [
			{username: String}
		]
	}, {collection: 'pets'});
	return PetSchema
};