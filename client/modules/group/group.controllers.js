angular.module('checkmate')

.controller('GroupController', ['$scope', '$state', 'Group', '$storage', function($scope, $state, Group, $storage) {

  $scope.auth = function() {
    if(!$storage.get('user')) { $state.go('splash'); }
  };

  $scope.user = $storage.get('user');

  Group.getMembers(function(members) {
    $scope.groupMembers = members; 
  }); 

  $scope.bills = Group.bills;

  $scope.report = Group.splitBills();

  $scope.showAddBillForm = false;

  $scope.addBillFormDisplay = function() {
    $scope.showAddBillForm = !$scope.showAddBillForm;
  };

  $scope.newBill = {
    whoPaid: $scope.user,
    groupId: $storage.get('group')
  };

  $scope.addBill = function() {
    $scope.addBillFormDisplay();
    var amount = parseInt($scope.newBill.amount, 10);
    $scope.newBill.amount = amount;
    Group.addBill($scope.newBill, function(bills) {
      $scope.bills = bills;
    });
    // $scope.report = Group.splitBills();
    $scope.newBill = {};
  };

}]);