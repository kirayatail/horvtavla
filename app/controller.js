'use strict';
var app = angular.module('horvtavla');

app.controller('StartController', ['$scope', '$http',
function($scope, $http) {
    console.log("Running Angular controller");

    $scope.registerSuccess = false;

    $scope.submit = function() {
      var pledge = {
        email: $scope.email,
        amount: $scope.amount,
        nick: $scope.nick,
        anonymous: $scope.anonymous
      };
      console.log("Sending registration...");
      $scope.registerPending = true;
      $http.post('/api/pledge', pledge).then(function(res) {
        $scope.registerPending = false;
        $scope.registerSuccess = true;

        $scope.email = "";
        $scope.amount = "";
        $scope.nick = "";
        $scope.anonymous = false;

      }, function(err) {
        $scope.registerPending = false;
        console.error(err);
      });
    };

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
