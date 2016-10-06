var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = "127.0.0.1";
var port = 3000; 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var connectionString = 'mongodb://localhost/cs5610';

// mongoose.connect(connectionString);
// var db = mongoose.connection;
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
//app.get("/test", function(req, res) {
//    res.send({title : "Test Json"});
//});

// require("./public/assignment/server/app.js")(app, mongoose, db);
// require("./public/project/server/app.js")(app, mongoose, db);

app.listen(port, ipaddress);