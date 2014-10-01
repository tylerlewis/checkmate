describe('AuthController', function() {
  'use strict';

  beforeEach(module('checkmate'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope, $injector) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AuthController', {
      $scope: scope
    });

  }));

  it('should exist', function() {
    expect(ctrl).to.not.equal(undefined);
  });

  it('sign up fields should be stored in a newUser object', function() {
    expect(scope.newUser).to.be.a('object');
  });

  it('log in fields should be stored in an existingUser object', function() {
    expect(scope.existingUser).to.be.a('object');
  });

  it('should toggle views between sign up and log in', function() {
    scope.signUpDisplay = true;
    scope.toggleView();
    expect(scope.signUpDisplay).to.equal(false);
  });

  it('should pass user input sign up data to Auth service for authentication', function() {
    expect(scope.signUpUser).to.be.a('function');
  });

  it('should pass user input log in data to Auth service for authentication', function() {
    expect(scope.logInUser).to.be.a('function');
  });

});