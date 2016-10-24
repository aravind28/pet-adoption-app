var mongoose = require('mongoose');
module.exports = function(app, db, petModel){
	require("./services/pet.service.server.js")(app, petModel);
}