'use strict';

var db = require('./db/db.js');

module.exports = function(app, passport) {

  app.use('/api/users', require('./api/users'));
  app.use('/api/groups', require('./api/groups'));

  app.post('/auth/signup', passport.authenticate('local-signup'), function(request, response) {
    response.send(200);
  });

  app.post('/auth/login', passport.authenticate('local-login'), function(request, response) {
    response.send(200);
  });

  app.post('/groups/create', function(request, response) {
    response.send(200);
  });

  app.post('/groups/join', function(request, response) {
    response.send(200);
  });

  app.get('/auth/logout', function(request, response) {
    request.logout();
    response.redirect('/');
  });
  
};
