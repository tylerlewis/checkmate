var express = require('express');
var passport = require('./auth.js');
var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '../../client'));

app.listen(port, function() {
  console.log('Now listening to ', port);
});

app.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));