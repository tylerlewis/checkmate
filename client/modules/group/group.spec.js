describe('GroupController', function() {
  'use strict';

  beforeEach(module('checkmate'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope, $injector) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('GroupController', {
      $scope: scope
    });

  }));

  it('should exist', function() {
    expect(ctrl).to.not.equal(undefined);
  });

  it('should display all the members in that group', function() {
    expect(scope.groupMembers).to.be.a('array');
  });

  it('should display all the bills currently being tracked', function() {
    expect(scope.bills).to.be.a('array');
  });

  it('bills being displayed should display who paid the bill', function() {
    var bill = scope.bills[0];
    expect(bill.billPayer).to.not.equal(undefined);
  });

  it('bills being displayed should display type of bill', function() {
    var bill = scope.bills[0];
    expect(bill.billType).to.not.equal(undefined);
  });

  it('bills being displayed should display amount of bill', function() {
    var bill = scope.bills[0];
    expect(bill.billAmount).to.not.equal(undefined);
  });

  it('bills being displayed should display when bill was added', function() {
    var bill = scope.bills[0];
    expect(bill.billDate).to.not.equal(undefined);
  });

  it('group members should be able to add a bill', function() {
    expect(scope.addBill).to.be.a('function');
  });

  it('a bill that is added should receive the member that paid the bill, the type of bill and amount of bill as input from user, and should add creation date of bill', function() {
    expect(scope.newBill).to.be.a('object');
  });

  it('report box should display who owes who what after splitting the bills', function() {
    scope.owes();
    expect(scope.report).to.be.a('array');
  });

});