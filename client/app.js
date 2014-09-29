angular.module('checkmate', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('splash', {
      url: '/',
      templateUrl: 'modules/splash/splash.html',
      controller: 'SplashController'
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

}]);