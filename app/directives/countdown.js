var app = angular.module('horvtavla');

app.directive('countdown', ['$interval', function($interval) {

  var durationString = function(ts) {
    var days = Math.floor(ts/86400);
    var hrs = Math.floor(ts/3600) % 24;
    var min = Math.floor(ts/60) % 60;
    var sec = ts % 60;

    return [days+'d', hrs+'h', min+'m', sec+'s'].join(' ');
  }

  return {
    template: '<h2 ng-if="counter">Deadline för registrering:<br />{{counter}}</h2>',
    scope: {
      deadline: '@'
    },
    link: function(scope) {
      scope.counter = "";
      $interval(function() {
        if(scope.deadline) {
          var diff = Math.floor((scope.deadline - Date.now()) / 1000);
          scope.counter = durationString(diff);
        }
      })

    }
  }
}]);
