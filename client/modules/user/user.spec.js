describe('UserController', function() {
  'use strict';

  beforeEach(module('checkmate'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope, $injector) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('UserController', {
      $scope: scope
    });

  }));

  it('should exist', function() {
    expect(ctrl).to.not.equal(undefined);
  });

  it('clicking create group button on form should direct users to group page', function() {
    expect(scope.createGroup).to.be.a('function');
  });

  it('clicking join group button on form should direct users to existing group page', function() {
    expect(scope.joinGroup).to.be.a('function');
  });

  it('create group form should transmit form info in an object', function() {
    expect(scope.newGroup).to.be.a('object');
  });

  it('join group form should transmit form info in an object', function() {
    expect(scope.existingGroup).to.be.a('object');
  });

  it('only the form that the user has selected should be displayed', function() {
    expect(scope.toggleForm).to.be.a('function');
  });

});