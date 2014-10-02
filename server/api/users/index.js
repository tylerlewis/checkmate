'use strict';

var express = require('express');
var passport = require('../../auth.js');
var controller = require('./users.controller.js');

var router = express.Router();

router.post('/signup', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/login'
}));
router.post('/login', controller.loginUser);

module.exports = router;