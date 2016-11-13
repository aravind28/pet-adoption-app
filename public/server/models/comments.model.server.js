/**
 * Created by Akshay on 19-10-2016.
 */

module.exports = function (app, db, mongoose, petModel) {

    var CommentsSchema = require("./comments.schema.server.js")(app, mongoose);
    var CommentsModel = mongoose.model('CommentsModel', CommentsSchema);

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

        return petModel.findById(petId)
            .then(
                function (app) {
                    app.comments.push(comments);
                    return app.save();
                }
            )
    }

    function findCommentsById(commentId){
        return CommentsModel.findById(commentId).select("comments");
    }
}