angular.module('checkmate')

.controller('GroupController', ['$scope', '$state', 'Group', function($scope, $state, Group) {
  
  $scope.groupMembers = Group.userSeed[0].users;

  $scope.bills = Group.groupSeed[0].bills;

  $scope.report = Group.splitBills();

  $scope.showAddBillForm = false;

  $scope.addBillFormDisplay = function() {
    $scope.showAddBillForm = !$scope.showAddBillForm;
  };

  $scope.newBill = {};

  $scope.addBill = function() {
    $scope.addBillFormDisplay();
    var rand = Math.floor((Math.random() * 3) + 0);
    $scope.newBill.whoPaid = Group.userSeed[0].users[rand].name;
    var amount = parseInt($scope.newBill.amount, 10);
    $scope.newBill.amount = amount;
    Group.addBill($scope.newBill);
    $scope.report = Group.splitBills();
    $scope.newBill = {};
  };

}]);