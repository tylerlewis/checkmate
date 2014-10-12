angular.module('checkmate', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('splash', {
      url: '/',
      templateUrl: 'modules/splash/splash.html',
      controller: 'SplashController'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'modules/login/login.html',
      controller: 'LoginController'
    })

    .state('user', {
      url: '/user',
      templateUrl: 'modules/user/user.html',
      controller: 'UserController'
    })

    .state('group', {
      url: '/group',
      templateUrl: 'modules/group/group.html',
      controller: 'GroupController'
    });

}])

.service('$storage', [function() {

  this.set = function(key, value) {
    localStorage.setItem(key, value);
  };

  this.get = function(key) {
    return localStorage.getItem(key);
  };

  this.clear = function() {
    localStorage.clear();
  };
  
}]);