var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String
});

var User = mongoose.model('User', userSchema);

exports.signupUser = function(userObject) {

  var user = new User({
    firstName: userObject.firstName,
    lastName: userObject.lastName,
    email: userObject.email,
    username: userObject.username,
    password: userObject.password
  });

  user.save(function (err, user) {
    if (err) { return err; }
  });

};
