angular.module('checkmate')

.controller('NavbarController', ['$scope', '$state', 'Login', '$storage', function($scope, $state, Login, $storage) {

  $scope.loggedIn = function() {
    if($storage.get('user')) { return true; }
    else { return false; }
  };

  $scope.username = $storage.get('user');

  $scope.goHome = function() {
    $state.go('splash');
  };

  $scope.goToLogin = function(context) {
    Login.context = context;
    if($state.current.name === 'login') { $state.go($state.current, {}, {reload: true}); }
    else { $state.go('login'); }
  };

  $scope.goToProfile = function() {
    $state.go('user');
  };

  $scope.logOut = function() {
    Login.logOut();
  };

}]);