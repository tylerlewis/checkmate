'use strict';

var express = require('express');
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

require('./routes')(app);

var server = require('http').createServer(app);

server.listen(port, function() {
  console.log('Now listening to ', port);
});
