var app = angular.module('horvtavla');

app.directive('backerList', function(){
  return {
    template: '<h2>Tack till:</h2><ul class="backerlist"><li ng-class="{unpaid: !b.paid }" ng-repeat="b in backers">{{b}}</li><li ng-if="anonymous > 0">and {{anonymous}} anonymous backer<span ng-if="anonymous > 1">s</span></li></ul>',
    scope: {
      backers: '=',
      anonymous: '='
    }
  }
})
