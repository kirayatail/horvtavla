'use strict';

var app = angular.module('horvtavla', ['ngRoute'
]);

app.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   when('/', {
      templateUrl: 'partials/start.html',
      controller: 'StartController'
   }).
   when('/confirm/:token', {
      templateUrl: 'partials/confirm.html',
      controller: 'ConfirmController'
   }).

   otherwise({
      redirectTo: '/'
   });

}]);
