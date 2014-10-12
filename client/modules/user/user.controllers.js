angular.module('checkmate')

.controller('UserController', ['$scope', '$state', '$storage', function($scope, $state, $storage) {

  $scope.auth = function() {
    if(!$storage.get('user')) { $state.go('splash'); }
  };

  $scope.showCreateGroupForm = false;

  $scope.showJoinGroupForm = false;

  $scope.toggleForm = function(form) {
    if(form === 0) {
      if($scope.showJoinGroupForm) { $scope.showJoinGroupForm = false; }
      if(!$scope.showCreateGroupForm) { $scope.showCreateGroupForm = true; }
    } else {
      if($scope.showCreateGroupForm) { $scope.showCreateGroupForm = false; }
      if(!$scope.joinCreateGroupForm) { $scope.showJoinGroupForm = true; }
    }
  };

  $scope.newGroup = {};

  $scope.existingGroup = {};
  
  $scope.createGroup = function() {
    $state.go('group');
  };

  $scope.joinGroup = function() {
    $state.go('group');
  };

}]);