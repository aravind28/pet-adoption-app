module.exports = function(app, questionModel){
    
    app.post('/msdapi/project/user/:userId/question', createQuestion);
    app.get('/msdapi/project/question/:id', getQuestionById);
    app.delete('/msdapi/project/question/:id', deleteQuestion);
    
    function createQuestion(req, res) {
        var questionBody = req.body;
        var userId = req.params.userId;
        var newQuestion = {
            userId: userId,
            title: questionBody.title,
            content: questionBody.content
        };
        questionModel.createQuestion(newQuestion).then(function(result) {
            res.jsonp(result); 
        });
    }

    function getQuestionById(req, res) {
        questionModel.getQuestionById(req.params.id).then(
            function(result, err) {
                res.jsonp(result);
            }
        );
    }
    
    function deleteQuestion(req, res) {
        var questionId = req.params.id;
        questionModel.deleteQuestion(questionId).then(function(result, err) {
            if (result) {
                res.jsonp(result);
            }
        });
    }
}