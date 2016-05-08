'use strict';
var app = angular.module('horvtavla');

app.controller('StartController', ['$scope', '$http', '$interval', '$anchorScroll',
function($scope, $http, $interval, $anchorScroll) {
    console.log("Running Angular controller");

    $scope.backers = [];
    $scope.anonymous = 0;
    $scope.deadlinePassed = false;

    $http.get('/api/stats').then(function(res) {
      $scope.backers = res.data.backers;
      $scope.anonymous = res.data.anonymous;
      $scope.sum = res.data.sum;
    });

    $scope.registerSuccess = false;

    $scope.goto = $anchorScroll;

    $interval(function() {
      if($scope.deadline && Date.now() > $scope.deadline)
        $scope.deadlinePassed = true;
    }, 2000)

}]);


app.controller('ConfirmController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.done = false;

  $http.get('/api/confirm/'+$routeParams.token).then(function(res) {
    console.log(res);
    $scope.confirm = res.data.confirmed;
    $scope.done = true;
  }, function(err) {
    $scope.confirm = false;
    $scope.done = true;
  });


}]);
