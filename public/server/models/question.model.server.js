var q = require('q')
module.exports = function(app, mongoose, db) {
    var QuestionSchema = require("./question.schema.server.js")(app, mongoose);
    var QuestionModel = mongoose.model("question", QuestionSchema);

    var api = {
        createQuestion : createQuestion,
        deleteQuestion : deleteQuestion
    };
    
    function createQuestion(newQuestion) {
        var deferred = q.defer();
        QuestionModel.create(newQuestion, function(err, results) {
            deferred.resolve(results);
        });
        return deferred.promise;
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