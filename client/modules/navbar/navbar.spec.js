describe('NavbarController', function() {
  'use strict';

  beforeEach(module('checkmate'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope, $injector) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('NavbarController', {
      $scope: scope
    });

  }));

  it('should exist', function() {
    expect(ctrl).to.not.equal(undefined);
  });

  it('navbar should have a sign up function', function() {
    expect(scope.signUp).to.be.a('function');
  });

  it('navbar should have a log in function', function() {
    expect(scope.logIn).to.be.a('function');
  });

  it('navbar should redirect users to authentication page when sign up or log in button is clicked', function() {
    expect(scope.goToAuth).to.be.a('function');
  });

  it('goToAuth function should pass context to sign up/log in state', function() {
    //
  });

  it('"checkmate" on navbar should redirect users to splash page', function() {
    expect(scope.goHome).to.be.a('function');
  });

  it('navbar should be aware of whether or not the user is logged in', function() {
    expect(scope.loggedIn).to.exist;
  })

  it('navbar should display user\s name/sign out instead of sign up/log in if they are logged in', function() {
    expect(scope.doThisLater).to.be.a('function');
  }); 

});