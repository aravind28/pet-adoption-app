/**
 * Created by Akshay on 13-10-2016.
 */

module.exports = function(app, mongoose,db){
    var userModel = require("./models/user.model.server.js")(app, mongoose, db);
    require("./services/user.service.server.js")(app, userModel);

    var questionModel = require("./models/question.model.server.js")(app, db, mongoose);
    require("./services/question.service.server.js")(app, questionModel);

    var petModel = require("./models/pet.model.server.js")(app, db, mongoose, userModel);
    require("./services/pet.service.server.js")(app, petModel);
    
    var commentsModel = require("./models/comments.model.server.js")(app, db, mongoose, petModel);
    require("./services/comments.service.server.js")(app, commentsModel);
}