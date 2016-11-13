module.exports = function (app, mongoose) {

    var CommentsSchema = new mongoose.Schema({
        createdAt: {type: Date, default: Date.now},
        comments: String,
        username: String,
        emails: [String]
    }, {collection: 'comments'});
    return CommentsSchema;
};