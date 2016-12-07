/**
 * Created by Akshay on 19-10-2016.
 */

module.exports = function (app, db, mongoose, petModel) {

    var CommentsSchema = require("./comments.schema.server.js")(app, mongoose);
    var CommentsModel = mongoose.model('CommentsModel', CommentsSchema);
    var UserSchema2 = require("./user.schema.server.js")(app, mongoose);
    var PetSchema2 = require("./pet.schema.server.js")(app, mongoose); 
    var UserModel2 = mongoose.model("user2", UserSchema2);
    var PetModel2 = mongoose.model("petModel2", PetSchema2);

    var api = {
        savecomments: savecomments,
        findCommentsById: findCommentsById,
        getCommentsForPet: getCommentsForPet,
        getCommentsForUser: getCommentsForUser
    };
    return api;

    function savecomments(user, petId){
        var deferred = q.defer();
        var comment ={
            createAt : Date.now(),
            comments: user.comments,
            userId: user.userId,
            emails: user.emails,
            petId : petId
        };
        UserModel2.findOne({_id: user.userId},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }
                if(doc){
                    console.log("position1");
                    PetModel2.findOne({_id: petId},
                        function(err, doc2){
                            if(doc2){
                                console.log(doc2);
                                return CommentsModel.create(comment);
                            }
                            if(err){
                                deferred.reject(err);
                            }
                        });
                    
                }
            });
        // return CommentsModel.create(comment);
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