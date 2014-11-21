var directivesModule = angular.module('raffler.directives', []);

directivesModule.directive('starRating', function() {
  return {
    restrict: 'E',
    template: "<ul class='rating'>" + "<li ng-repeat='star in stars' ng-class='star' ng-click='starClicked($index)'>" + "★" + "</li>" + "</ul>",
    scope: {
      ratingValue: "=",
      max: "=",
      // The & binding allows a directive to trigger evaluation of an expression
      onRatingSelected: '&'
    },
    link: function($scope, elem, attrs) {
      // link function is like a controller
      
      // a star click changes the ratingValue
      $scope.starClicked = function(index) {
        $scope.ratingValue = index + 1;
        // Update scoped newRating via 
        $scope.onRatingSelected({newRating: $scope.ratingValue});
      };

      // a watcher for when ratingValue changes, i.e. when it's clicked on
      $scope.$watch('ratingValue', function(newVal, oldVal) {
          updateStars();
      });

      var updateStars = function() {
        $scope.stars = [];
        for (var i = 0; i < $scope.max; i++) {
          $scope.stars.push({filled: i < $scope.ratingValue});
        };
        // stars looks something like this:
        // [{"filled":true},{"filled":true},{"filled":false} ...}] 
      };

    }
  };
});

