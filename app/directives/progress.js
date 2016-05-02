var app = angular.module('horvtavla');

app.directive('progressBar', function() {
  var items = [
    "Idé & konceptdesign",
    "Söka tillstånd hos Horv, StyrIT och P.R.I.T.",
    "Färdig design, högupplöst material och rendering",
    "Starta insamling",
    "Beställa tavlan",
    "Avsluta insamling",
    "Beställa skylt",
    "Leverans",
    "Montering, avtäckning & fest"
  ];
  return {
    templateUrl: 'directives/progress.html',
    link: function(scope) {
      scope.items = items;
      scope.passedIndex = 4;
    }
  }
})
