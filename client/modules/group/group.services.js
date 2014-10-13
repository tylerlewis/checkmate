angular.module('checkmate')

.factory('Group', ['$http', '$state', '$storage', function($http, $state, $storage) {
  var createGroup = function(group) {
    console.log("BEFORE POST")
    $http({
      url: 'http://localhost:8000/groups/create',
      method: 'POST',
      data: JSON.stringify(group)
    }).success(function(data) {
      $storage.set('group', group.name);
      $state.go('group');
    }).error(function(err) {
      //
    });
  };

  var joinGroup = function(group) {
    $http({
      url: 'http://localhost:8000/groups/join',
      method: 'POST',
      data: JSON.stringify(group)
    }).success(function(data) {
      $storage.set('group', group.name);
      $state.go('group');
    }).error(function(err) {
      //
    });
  };

  var members;

  var getMembers = function(callback) {
    var group = $storage.get('group');
    $http({
      url: 'http://localhost:8000/groups/' + group,
      method: 'GET',
    }).success(function(members) {
      callback(members);
    }).error(function(err) {
      //
    });
  };

  // var groupSeed = {
  //   0: {bills: [{whoPaid: 'Tyler', type: 'electric', amount: 100, date: 'October 5, 2013'},
  //               {whoPaid: 'Kent', type: 'cable', amount: 80, date: 'October 1, 2013'},
  //               {whoPaid: 'Beeler', type: 'water', amount: 20, date: 'October 12, 2013'},
  //               {whoPaid: 'Paul', type: 'gas', amount: 40, date: 'October 4, 2013'}]
  //   }
  // };

  var groupBills = [];

  var addBill = function(billObj, callback) {
    groupBills.push(billObj);
    callback(groupBills);
    // $state.go($state.current, {}, {reload: true});
    // $http({
    //   url: 'http://localhost:8000/bills',
    //   method: 'POST',
    //   data: JSON.stringify(billObj)
    // }).success(function(data) {
    //   $state.go($state.current, {}, {reload: true});
    // }).error(function(err) {
    //   //
    // });
  };

  var splitBills = function() {

    if(groupBills.length) {
      var data = [];
      var bills = groupBills;

      var addedUp = [];
      var memo = {};
      for(var i = 0; i < bills.length; i++) {
        if(!memo[bills[i].whoPaid]) {
          var sum = bills[i].amount;
          for(var j = i + 1; j < bills.length; j++) {
            if(bills[i].whoPaid === bills[j].whoPaid) {
              sum += bills[j].amount
            }
          }
          memo[bills[i].whoPaid] = true;
          addedUp.push({whoPaid: bills[i].whoPaid, amount: sum});
        }
      }

      for(var i = 0; i < addedUp.length; i++) {
        var who = addedUp[i].whoPaid;
        var paid = addedUp[i].amount / 4;
        data.push({who: who, paid: paid});
      }

      data.sort(function(a, b) {
        return a.paid - b.paid;
      });

      var results = [];

      for(var i = 0; i < data.length; i++) {
        for(var j = i + 1; j < data.length; j++) {
          var who = data[i].who;
          var debtor = data[j].who;
          var amount = data[j].paid - data[i].paid;
          var billObj = {who: who, debtor: debtor, amount: amount};
          results.push(billObj);
        }
      }
      return results;
    } else {
      return [];
    }

  };

  return {
    createGroup: createGroup,
    joinGroup: joinGroup,
    members: members,
    getMembers: getMembers,
    groupBills: groupBills,
    splitBills: splitBills,
    addBill: addBill
  };

}]);