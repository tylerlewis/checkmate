'use strict';

var passport = require('passport');
var Promise = require('bluebird');
var User = require('../../db/tables/users.js');

exports.signupUser = function(request, response) {

  var user = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    username: request.body.username,
    password: request.body.password
  };

  User.signupUser(user);
  response.send(200, 'worked');
  
};

exports.loginUser = function(user) {

};

