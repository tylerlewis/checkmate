'use strict';

var db = require('./db/db.js');

module.exports = function(app, passport) {

  // app.use('/api/users', require('./api/users'));
  // app.use('/api/groups', require('./api/groups'));

  app.post('/auth/signup', passport.authenticate('local-signup'), function(request, response) {
    response.send(200);
  });

  app.post('/auth/login', passport.authenticate('local-login'), function(request, response) {
    console.log(request, response)
    response.send(200);
  });

  app.get('/auth/logout', function(request, response) {
    request.logout();
    response.redirect('/');
  });

  app.post('/groups/create', function(request, response) {
    db.findGroup(request.body, function(err, group) {
      if(err) { response.send(err); }
      else if(group.length) { response.send(401, 'Group name already taken.'); }
      else {
        db.createGroup(request.body, function(err, group) {
          if(err) { response.send(err); }
          else {
            db.addGroupLink(request.body.name, request.body.user, function(err, results) {
              if(err) { response.send(err); }
              response.status(200).send(results);
            });
          }
        });
      }
    });
  });

  app.post('/groups/join', function(request, response) {
    db.findGroup(request.body, function(err, group) {
      console.log(group)
      if(err) { response.send(err); }
      else if(!group.length) { response.send(401, 'Group name or password is incorrect.'); }
      else {
        db.joinGroup(request.body, group[0].password, function(err) {
          if(err) { response.status(401).send('Password incorrect.'); }
          else {
            db.addGroupLink(request.body.name, request.body.user, function(err, results) {
              if(err) { response.send(err); }
              response.status(200).send(results);
            });
          }
        });
      }
    });
  });

  app.get('/groups/:name', function(request, response) {
    db.findGroupLink(request.params.name, function(err, members) {
      if(err) { response.send(err); }
      response.status(200).send(members);
    });
  });

  app.post('/bills', function(request, response) {
    db.addBill(request.body, function(err, bill) {
      if(err) { response.send(err); }
      response.status(200).send(bill);
    });
  });

  app.get('/bills/:groupName', function(request, response) {
    db.getBills(request.params.groupName, function(err, bills) {
      if(err) { response.send(err); }
      response.status(200).send(bills);
    });
  });
  
};
