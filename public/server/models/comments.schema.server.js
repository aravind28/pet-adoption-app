module.exports = function (app, mongoose) {
<<<<<<< HEAD
=======

>>>>>>> ecfeb0d6c7e04fc8865aaadd3e72c0fa5250fcd5
    var CommentsSchema = new mongoose.Schema({
        createdAt: {type: Date, default: Date.now},
        comments: String,
        username: String,
        emails: [String]
    }, {collection: 'comments'});
    return CommentsSchema;
};