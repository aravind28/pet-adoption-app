/**
 * Created by Akshay on 19-10-2016.
 */

module.exports = function (app, commentsModel) {

    app.post("/msdapi/project/pet/:id/comments", postcomments);
    app.get("/msdapi/project/comments/:id", getcomments);

    function postcomments(req, res){

        commentsModel
            .savecomments(req.body, req.params.id)
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
            .findCommentsById(req.params.id)
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