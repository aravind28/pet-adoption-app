/**
 * Created by Akshay on 19-10-2016.
 */

module.exports = function (db, mongoose) {

    var CommentsSchema = require("./comments.schema.server.js")(mongoose);
    var ArticleSchema = require("./article.schema.server.js")(mongoose);

    var CommentsModel = require('CommentsModel', CommentsSchema);
    var ArticleModel = reqquire('ArticleModel', ArticleSchema);

    var api = {
        savecomments: savecomments,
        findCommentsById: findCommentsById
    };
    return api;

    function savecomments(user, articleid){

        var comments ={
            createAt : Date.now(),
            comments: user.comments,
            username: user.username,
            emails: user.emails
        }

        return ArticleModel.findById(articleid)
            .then(
                function (app) {
                    app.comments.push(comments);
                    return app.save();
                }
            )
    }

    function findCommentsById(articleid){
        return ArticleModel.findById(articleid).select("comments");
    }
}