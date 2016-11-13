/**
 * Created by Akshay on 13-10-2016.
 */

module.exports = function(app, mongoose){

    var UserSchema = new mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        roles: [String],
        emails: [String],
        phones: [String],
        // id's of favorite pets for this user
        favorites: [String],
        // favorites for this pet
        favoritePets: [PetSchema],
        notifications : [String]
    }, {collection: 'user'});
    return UserSchema;
};