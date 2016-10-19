/**
 * Created by Akshay on 13-10-2016.
 */

var mongoose = require('mongoose');

module.exports = function(app, db, userModel){

    require("./services/user.service.server.js")(app, userModel);

    var commentsModel = require("./models/comments.model.server.js")(db, mongoose);
    require("./services/comments.service.server.js")(app, commentsModel);

    var questionModel = require("./models/questions.model.server.js")(db, mongoose);
    require("./service/questions.service.server.js")(app, questionModel);
}