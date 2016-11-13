module.exports = function(mongoose){
	var PetSchema = mongoose.Schema({
		petName : String,
		petGenger : String,
		petAge : Number,
		petCategory : String,
		petAvailability : String,
		petStarredBy : [String]
	});
	return PetSchems
};