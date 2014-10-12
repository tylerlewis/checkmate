angular.module('checkmate')

.factory('Login', ['$http', '$state', '$storage', function($http, $state, $storage) {

  var context = true;

  var loggedIn = false;

  var signUpUser = function(user) {
    $http({
      url: 'http://localhost:8000/auth/signup',
      method: 'POST',
      data: JSON.stringify(user),
      headers: {'Content-type': 'application/json'}
    }).success(function(data, status, headers, config) {
      var user = JSON.parse(config.data);
      $storage.set('user', user.username);
      loggedIn = true;
      $state.go('user');
    }).error(function(data, status, headers, config) {

    });
  };

  var logInUser = function(user) {
    $http({
      url: 'http://localhost:8000/auth/login',
      method: 'POST',
      data: JSON.stringify(user),
      headers: {'Content-type': 'application/json'}
    }).success(function(data, status, headers, config) {
      var user = JSON.parse(config.data);
      $storage.set('user', user.username);
      loggedIn = true;
      $state.go('user');
    }).error(function(data, status, headers, config) {

    });
  };

  var logOut = function() {
    $http({
      url: 'http://localhost:8000/auth/logout',
      method: 'GET',
      headers: {'Content-type': 'application/json'}
    }).success(function(data, status, headers, config) {
      $storage.clear();
      $state.go('splash');
    }).error(function(data, status, headers, config) {

    });
  };

  return {
    context: context,
    loggedIn: loggedIn,
    signUpUser: signUpUser,
    logInUser: logInUser,
    logOut: logOut
  };

}]);