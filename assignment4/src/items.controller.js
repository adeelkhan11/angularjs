(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['itemData'];
function ItemsController(itemData) {
  var items = this;
  items.categoryName = itemData.category.name;
  items.itemData = itemData.menu_items;
}

})();
