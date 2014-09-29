angular.module('checkmate')

.controller('AuthController', ['$scope', '$state', 'Auth', function($scope, $state, Auth) {

  $scope.signUpDisplay = Auth.context;

  $scope.toggleView = function() {
    Auth.context = !Auth.context;
    $scope.signUpDisplay = Auth.context;
  };
  
  $scope.newUser = {};

  $scope.existingUser = {};

  $scope.signUpUser = function() {
    Auth.signUpUser($scope.newUser);
  };

  $scope.logInUser = function() {
    Auth.logInUser($scope.existingUser);
  };

}]);