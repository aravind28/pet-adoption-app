/**
 * Created by RT on 17/09/16.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

//var connectionString = 'mongodb://localhost/msdapi';
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//        process.env.OPENSHIFT_APP_NAME;
//}
//mongoose.connect(connectionString);
var db = mongoose.connection;

require("./public/server/app.js")(app, mongoose, db);

app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), app.get('ipaddress'));