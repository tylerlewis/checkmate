'use strict';

var express = require('express');
var passport = require('passport');
var controller = require('./users.controller.js');

var router = express.Router();

router.post('/signup', controller.signupUser);
router.post('/login', controller.loginUser);

module.exports = router;