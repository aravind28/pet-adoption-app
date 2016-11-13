/**
 * Created by Akshay on 19-10-2016.
 */

<<<<<<< HEAD
module.exports = function (app, db, mongoose, petModel) {

    var CommentsSchema = require("./comments.schema.server.js")(app, mongoose);
    var CommentsModel = mongoose.model('CommentsModel', CommentsSchema);
=======
module.exports = function (app,db, mongoose) {

    var CommentsSchema = require("./comments.schema.server.js")(app, mongoose);
    var PetModelSchema2 = require('./pet.schema.server.js')(app, mongoose);

    var CommentsModel = mongoose.model('CommentsModel', CommentsSchema);
    var PetModel2 = mongoose.model('PetModel2', PetModelSchema2);

>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5

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

<<<<<<< HEAD
        return petModel.findById(petId)
=======
        return PetModel2.findById(petId)
>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5
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