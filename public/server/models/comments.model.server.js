/**
 * Created by Akshay on 19-10-2016.
 */
var q = require('q');
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

    function savecomments(commentBody, petId){
        var deferred = q.defer();
        var comment ={
            createAt : Date.now(),
            comments: commentBody.comments,
            userId: commentBody.userId,
            emails: commentBody.emails,
            petId : petId
        };

        userModel.findUserById(commentBody.userId).then(function(res, err) {
            if(!res) {
                deferred.resolve(null);
            } else {
                petModel.findPetById(petId).then(function(res2, err2) {
                    if (!res2) {
                        deferred.resolve(null);
                    } else {
                        deferred.resolve(CommentsModel.create(comment));
                    }
                });
            }
        });

        return deferred.promise;
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