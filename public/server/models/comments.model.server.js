/**
 * Created by Akshay on 19-10-2016.
 */

module.exports = function (app, db, mongoose, petModel, userModel) {

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
            userId: user.userId,
            emails: user.emails,
            petId : petId
        };

        userModel.findUserById(user.userId).then(function(res, err) {
            if(!res) {
                return null;
            } else {
                petModel.findPetById(petId).then(function(res2, err2) {
                    if (!res2) {
                        return null;
                    } else {
                        return CommentsModel.create(comment);
                    }
                });
            }
        });
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