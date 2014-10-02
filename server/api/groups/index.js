'use strict';

var express = require('express');
var controller = require('./groups.controller.js');

var router = express.Router();

router.post('/create', controller.createGroup);
router.post('/join', controller.joinGroup);

module.exports = router;