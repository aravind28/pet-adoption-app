/**
 * Created by Akshay on 19-10-2016.
 */

module.exports = function (db, mongoose) {

    var CommentsSchema = require("./comments.schema.server.js")(mongoose);
    //var PetSchema = require("./pet.schema.server.js")(mongoose);

    var CommentsModel = mongoose.model('CommentsModel', CommentsSchema);
    //var PetModel = require('PetModel', PetSchema);

    var api = {
        savecomments: savecomments,
        findCommentsById: findCommentsById
    };
    return api;

    function savecomments(user, petId){

        var comments ={
            createAt : Date.now(),
            comments: user.comments,
            username: user.username,
            emails: user.emails
        }

        //return PetModel.findById(petId)
        //    .then(
        //        function (app) {
        //            app.comments.push(comments);
        //            return app.save();
        //        }
        //    )
    }

    function findCommentsById(commentId){
        return CommentsModel.findById(commentId).select("comments");
    }
}