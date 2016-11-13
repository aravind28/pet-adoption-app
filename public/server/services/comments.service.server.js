/**
 * Created by Akshay on 19-10-2016.
 */

module.exports = function (app, commentsModel) {

<<<<<<< HEAD
    app.post("/msdapi/project/pet/:id/comments", postcomments);
    app.get("/msdapi/project/comments/:id", getcomments);
=======
    app.post("/msdapi/project/dogarticle/:id/comments", postcomments);
    app.get("/msdapi/project/dogarticle/:id/comments", getcomments);
>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5

    function postcomments(req, res){

        commentsModel
<<<<<<< HEAD
            .savecomments(req.body, req.params.id)
=======
            .savecomments(req.body, req.params.articleid)
>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5
            .then(
                function (response) {
                    if(response){
                        res.json(response);
                    }
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getcomments(req, res){

        commentsModel
<<<<<<< HEAD
            .findCommentsById(req.params.id)
=======
            .findCommentsById(req.params.articleid)
>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5
            .then(
                function (doc) {
                    res.json(doc);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
    }
}