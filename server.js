/**
 * Created by RT on 17/09/16.
 */
var express = require('express');
var app = express();
var http = require("http");
var mongoose = require("mongoose");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

var connectionString = 'mongodb://localhost:27017/test';

if(process.env.MLAB_DB_USERNAME) {
    connectionString = process.env.MLAB_DB_URL_INIT +
        process.env.MLAB_DB_USERNAME + ":" +
        process.env.MLAB_DB_PASSWORD +
        process.env.MLAB_DB_URL_END + '/' +
        process.env.MLAB_DB_NAME;
}


mongoose.connect(connectionString);
var db = mongoose.connection;

require("./public/server/app.js")(app, mongoose, db);

app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), app.get('ipaddress'));