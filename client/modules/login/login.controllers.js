angular.module('checkmate')

.controller('LoginController', ['$scope', '$state', 'Login', function($scope, $state, Login) {

  $scope.signUpDisplay = Login.context;

  $scope.toggleView = function() {
    Login.context = !Login.context;
    $scope.signUpDisplay = Login.context;
  };
  
  $scope.newUser = {};

  $scope.existingUser = {};

  $scope.signUpUser = function() {
    $state.go('user');
    // Login.signUpUser($scope.newUser);
  };

  $scope.logInUser = function() {
    $state.go('user');
    // Login.logInUser($scope.existingUser);
  };

}]);