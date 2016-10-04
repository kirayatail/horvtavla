var app = angular.module('horvtavla');

app.directive('countdown', ['$interval', '$http', function($interval, $http) {

  var durationString = function(ts) {
    var days = Math.floor(ts/86400);
    var hrs = Math.floor(ts/3600) % 24;
    var min = Math.floor(ts/60) % 60;
    var sec = ts % 60;

    return [days+'d', hrs+'h', min+'m', sec+'s'].join(' ');
  }

  return {
    template: '<h2 ng-if="counter">Deadline för {{type}}:</h2><h1>{{counter}}</h1>',
    scope: {
      deadline: '='
    },
    link: function(scope) {
      var deadlines;
      scope.type = '';
      $http.get('/api/deadline').then(function(res) {
        deadlines = res.data;
        if(deadlines.register > Date.now()) {
          scope.deadline = deadlines.register;
          scope.type = 'registrering';
        } else {
          scope.deadline = deadlines.payment;
          scope.type = 'betalning';
        }
      })
      scope.counter = "";
      $interval(function() {
        if(scope.deadline) {
          if(scope.deadline > Date.now()) {
            var diff = Math.floor((scope.deadline - Date.now()) / 1000);
            scope.counter = durationString(diff);
          } else {
            scope.counter = "Deadline har passerat";
          }
        }
      }, 1000);

    }
  }
}]);
