(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['catData'];
function CategoriesController(catData) {
  var categories = this;
  categories.catData = catData;
}

})();
