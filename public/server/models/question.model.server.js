var q = require('q')
module.exports = function(app, db, mongoose, userModel) {
    var QuestionSchema = require("./question.schema.server.js")(app, mongoose);
    var QuestionModel = mongoose.model("QuestionModel", QuestionSchema);

    var api = {
        createQuestion : createQuestion,
        getQuestionById : getQuestionById,
        deleteQuestion : deleteQuestion
    };
    
    function createQuestion(newQuestion) {
        var deferred = q.defer();
        var userId = newQuestion.userId;

        userModel.findUserById(userId).then(
            function(res, err) {
                if (!res) {
                    deferred.resolve(null);
                } else {
                    QuestionModel.create(newQuestion, function(err, results) {
                        deferred.resolve(results);
                    });
                }
            }
        );
        return deferred.promise;
    }

    function getQuestionById(id) {
        return QuestionModel.findById(id);
    }
    
    function deleteQuestion(id) {
        var deferred = q.defer();
        QuestionModel.remove({_id : id}, function(err, results) {
            deferred.resolve(results);
        });
        return deferred.promise;
    }
    
    return api;
};