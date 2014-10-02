angular.module('checkmate')

.factory('Login', [function() {

  var context = true;

  var signUpUser = function(user) {
    console.log(user);
  };

  var logInUser = function(user) {
    console.log(user);
  };

  return {
    context: context,
    signUpUser: signUpUser,
    logInUser: logInUser
  };

}]);