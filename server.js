var express = require('express');
var app = express();
var subpath = express();
var http = require("http");
var mongoose = require("mongoose");
var url = require('url');
var argv = require('minimist')(process.argv.slice(2));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/v1", subpath);

var swagger = require("swagger-node-express").createNew(subpath);

app.use(express.static(__dirname + '/public'));
app.use(express.static('dist'));
subpath.use(express.static('dist'));

swagger.setApiInfo({
        title: "example API",
        description: "API to do something, manage something...",
        termsOfServiceUrl: "",
        contact: "yourname@something.com",
        license: "",
        licenseUrl: ""
    });

subpath.get('/', function (req, res) {
    res.sendfile(__dirname + '/dist/index.html');
});

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

swagger.configureSwaggerPaths("", "/api-docs", "");
var domain = 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".');

var port = (process.env.PORT || 5000);
var applicationUrl = 'http://' + domain + ':' + port;
swagger.configure(applicationUrl, '1.0.0');

app.set('ipaddress', (process.env.IP));
app.set('port', port);
app.listen(app.get('port'), app.get('ipaddress'));