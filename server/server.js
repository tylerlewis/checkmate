'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('./auth.js');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '../../client'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var allowCrossDomain = function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
};

app.use(allowCrossDomain);

var server = require('http').createServer(app);

require('./routes')(app);

mongoose.connect('mongodb://localhost/checkmate');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});

server.listen(port, function() {
  console.log('Now listening to ', port);
});
