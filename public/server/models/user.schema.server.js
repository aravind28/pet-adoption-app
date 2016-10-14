/**
 * Created by Akshay on 13-10-2016.
 */

module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        roles: [String],
        emails: [String],
        phones: [String]
    }, {collection: 'user'});
    return UserSchema;
};