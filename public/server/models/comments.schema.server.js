module.exports = function (app, mongoose) {
    var CommentsSchema = new mongoose.Schema({
        createdAt: {type: Date, default: Date.now},
        comments: String,
        userId: String,
        emails: [String],
        petId : String
    }, {collection: 'comments'});
    return CommentsSchema;
};