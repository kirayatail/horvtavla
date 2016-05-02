var app = angular.module('horvtavla');

app.directive('goalMeter', ['$http', function($http) {
  return {
    templateUrl:'directives/goalmeter.html',
    scope: {
    },
    link: function(scope, elem, attrs) {
      $http.get('/api/goals').then(function(res) {
        var goals = res.data.goals;
        scope.sum = Math.round(res.data.sum);
        var max = Math.max((res.data.max / 0.8), scope.sum);
        for(var i in goals) {
          goals[i].height = 100*goals[i].amount / max;
        }
        scope.goals = goals;
        scope.meterHeight = 100*scope.sum /max;
        console.log(scope.meterHeight)
      });
    }
  };
}]);
