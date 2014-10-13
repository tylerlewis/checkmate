angular.module('checkmate')

.controller('GroupController', ['$scope', '$state', 'Group', '$storage', function($scope, $state, Group, $storage) {

  $scope.auth = function() {
    if(!$storage.get('user')) { $state.go('splash'); }
  };

  $scope.user = $storage.get('user');

  Group.getMembers(function(members) {
    $scope.groupMembers = members; 
  }); 

  Group.getBills(function(bills) {
    $scope.bills = bills;
    Group.splitBills($scope.groupMembers, bills, function(bills, singleDebtor) {
      // Check to see if only one person in group has paid bills so far
      if(singleDebtor) {
        $scope.report = [];
        for(var i = 0; i < $scope.groupMembers.length; i++) {
          if($scope.groupMembers[i].username !== singleDebtor) {
            $scope.report.push({who: $scope.groupMembers[i].username, debtor: singleDebtor, amount: bills});
          }
        }
      } else {
        $scope.report = bills;
      }
    });
  });

  $scope.showAddBillForm = false;

  $scope.addBillFormDisplay = function() {
    $scope.showAddBillForm = !$scope.showAddBillForm;
  };

  $scope.newBill = {
    whoPaid: $scope.user,
    groupName: $storage.get('group')
  };

  $scope.addBill = function() {

    $scope.addBillFormDisplay();

    var months = {
      'Jan': 'January',
      'Feb': 'February',
      'Mar': 'March',
      'Apr': 'April',
      'May': 'May',
      'Jun': 'June',
      'Jul': 'July',
      'Aug': 'August',
      'Sep': 'September',
      'Oct': 'October',
      'Nov': 'November',
      'Dec': 'December'
    };

    var dateSplit = $scope.newBill.billDate.toString().split(' ');
    var date = months[dateSplit[1]] + ' ' + dateSplit[2] + ', ' + dateSplit[3];
    $scope.newBill.billDate = date;

    var amount = parseInt($scope.newBill.amount, 10);
    $scope.newBill.amount = amount;

    Group.addBill($scope.newBill);

    $scope.newBill = {};
  };

}]);