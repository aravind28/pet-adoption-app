/**
 * Created by Akshay on 13-10-2016.
 */

var mongoose = require('mongoose');

module.exports = function(app, db, userModel){

    require("./services/user.service.server.js")(app, userModel);
}