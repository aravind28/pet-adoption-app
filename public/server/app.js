/**
 * Created by Akshay on 13-10-2016.
 */

module.exports = function(app, mongoose,db){
    var userModel = require("./models/user.model.server.js")(app, mongoose, db);
    var questionModel = require("./models/question.model.server.js")(app, mongoose, db);
    
    require("./services/user.service.server.js")(app, userModel);
    require("./services/question.service.server.js")(app, questionModel);
}