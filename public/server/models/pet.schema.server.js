module.exports = function(app, mongoose){

	var PetSchema = new mongoose.Schema({
		petName : String,
		petGender : String,
		petAge : Number,
		petCategory : String,
		petAvailability : Boolean,
        adoptedBy : String,
		// id's of users who like this pet
		favorites: [String]
	}, {collection: 'pets'});
	return PetSchema;
};