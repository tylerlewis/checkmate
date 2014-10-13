var passport = require('passport');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcrypt');
var db = require('./db/db.js');

module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use('local-signup', new LocalStrategy(function(username, password, done) {
    db.findUser({ username: username }, function(err, user) {
      if(err) { return done(err); }
      if(user.length) {
        return done(null, false, { message: 'Username already exists' });
      }
      if(!user.length) {
        password = hashPassword(password);

        var newUser = {
          username: username,
          password: password
        };

        db.saveUser(newUser, function(err, user) {
          return done(null, user);
        });
      }
    });
  }));

  passport.use('local-login', new LocalStrategy(function(username, password, done) {
    db.findUser({ username: username }, function(err, user) {
      if(err) { return done(err); }
      if(!user.length) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if(user.length) {
        if(!validatePassword(password, user[0].password)) {
          return done(null, false, { message: 'Incorrect password' });
        }
      }
      return done(null, user);
    });
  }));

};

var validatePassword = function(password, storedPassword) {
  return bcrypt.compareSync(password, storedPassword); 
};

var hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

