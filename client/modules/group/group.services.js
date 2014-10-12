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

  var userSeed = {
    0: {users: [{name: 'Tyler'},
                {name: 'Beeler'},
                {name: 'Kent'},
                {name: 'Paul'}]
    }
  };

  var groupSeed = {
    0: {bills: [{whoPaid: 'Tyler', type: 'electric', amount: 100, date: 'October 5, 2013'},
                {whoPaid: 'Kent', type: 'cable', amount: 80, date: 'October 1, 2013'},
                {whoPaid: 'Beeler', type: 'water', amount: 20, date: 'October 12, 2013'},
                {whoPaid: 'Paul', type: 'gas', amount: 40, date: 'October 4, 2013'}]
    }
  };

  var addBill = function(billObj) {
    groupSeed[0].bills.push(billObj);
  };

  var splitBills = function() {

    var data = [];
    var bills = groupSeed[0].bills;

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

    console.log(data);
    return results;

  };

  return {
    createGroup: createGroup,
    joinGroup: joinGroup,
    userSeed: userSeed,
    groupSeed: groupSeed,
    splitBills: splitBills,
    addBill: addBill
  };

}]);