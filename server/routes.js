'use strict';

var db = require('./db/db.js');

module.exports = function(app, passport) {

  app.use('/api/users', require('./api/users'));
  app.use('/api/groups', require('./api/groups'));

  app.post('/auth/signup', passport.authenticate('local-signup'), function(request, response) {
    response.send(200);
  });

  app.post('/auth/login', passport.authenticate('local-login'), function(request, response) {
    console.log(request, response)
    response.send(200);
  });

  app.post('/groups/create', function(request, response) {
    db.findGroup(request.body, function(err, group) {
      if(err) { response.send(err); }
      else if(group.length) { response.send(401, 'Group name already taken.'); }
      else {
        db.createGroup(request.body, function(err, group) {
          if(err) { response.send(err); }
          else response.send(group);
        });
      }
    });
  });

  app.post('/groups/join', function(request, response) {
    db.findGroup(request.body, function(err, group) {
      if(err) { response.send(err); }
      else if(!group.length) { response.send(401, 'Group name or password is incorrect.'); }
      else {
        db.joinGroup(request.body, group[0].password, function(err, group) {
          if(err) { response.send(err); }
          else { response.send(group); }
        });
      }
    });
  });

  app.get('/auth/logout', function(request, response) {
    request.logout();
    response.redirect('/');
  });
  
};
