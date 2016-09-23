(function () {
'use strict';

angular.module('dietApp', [])

.controller('DietController', function ($scope) {
  $scope.lunchMenu = "";
  $scope.message = "";
  $scope.checkDiet = function () {
    if ($scope.lunchMenu == "") {
      $scope.message = "Please enter data first"
    }
    else if ($scope.lunchMenu.split(",").length > 3) {
      $scope.message = "Too much!";
    }
    else {
      $scope.message = "Enjoy!";
    }
  };
});

})();
