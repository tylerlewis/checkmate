angular.module('checkmate')

.controller('NavbarController', ['$scope', '$state', 'Auth', function($scope, $state, Auth) {

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

  $scope.goToAuth = function(context) {
    Auth.context = context;
    $state.go('auth');
  };

}]);