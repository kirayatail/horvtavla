var app = angular.module('horvtavla');

app.directive('registerform', ['$http', function($http){
  return {
    templateUrl: 'directives/registerform.html',
    link: function(scope) {
      scope.submit = function() {
        var pledge = {
          email: scope.email,
          amount: scope.amount,
          nick: scope.nick,
          anonymous: scope.anonymous
        };
        console.log("Sending registration...");
        scope.registerPending = true;
        $http.post('/api/pledge', pledge).then(function(res) {
          scope.registerPending = false;
          scope.registerSuccess = true;

          scope.email = "";
          scope.amount = "";
          scope.nick = "";
          scope.anonymous = false;

        }, function(err) {
          scope.registerPending = false;
          console.error(err);
        });
      };
    }

  }
}]);
