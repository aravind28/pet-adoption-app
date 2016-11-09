module.exports = function(app, mongoose){

    var QuestionSchema = new mongoose.Schema({
        userId: String,
        title: String,
        content: String
    }, {collection: 'question'});
    return QuestionSchema;
};