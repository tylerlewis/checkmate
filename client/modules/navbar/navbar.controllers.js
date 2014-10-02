angular.module('checkmate')

.controller('NavbarController', ['$scope', '$state', 'Login', function($scope, $state, Login) {

  // In the future, will need to refer to Auth service to see if user is logged in
  $scope.loggedIn = false;
  
  $scope.signUp = function() {
    // Will call Auth service with user info
  };

  $scope.logIn = function() {
    // Will call Auth service with user info
  };

  $scope.goHome = function() {
    $state.go('splash');
  };

  $scope.goToLogin = function(context) {
    Login.context = context;
    $state.go('login');
  };

}]);