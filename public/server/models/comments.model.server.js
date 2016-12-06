/**
 * Created by Akshay on 19-10-2016.
 */

module.exports = function (app, db, mongoose, petModel) {

    var CommentsSchema = require("./comments.schema.server.js")(app, mongoose);
    var CommentsModel = mongoose.model('CommentsModel', CommentsSchema);

    var api = {
        savecomments: savecomments,
        findCommentsById: findCommentsById,
        getCommentsForPet: getCommentsForPet,
        getCommentsForUser: getCommentsForUser
    };
    return api;

    function savecomments(user, petId){

        var comment ={
            createAt : Date.now(),
            comments: user.comments,
            userId: user._id,
            emails: user.emails,
            petId : petId
        };

        return CommentsModel.create(comment);
    }

    function findCommentsById(commentId){
        return CommentsModel.findById(commentId);
    }

    function getCommentsForPet(petId) {
        return CommentsModel.find({petId : petId});
    }

    function getCommentsForUser(userId) {
        return CommentsModel.find({userId : userId});
    }
}