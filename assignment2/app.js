(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory);

// LIST #1 - controller
ShoppingListController1.$inject = ['ShoppingListFactory', '$scope'];
function ShoppingListController1(ShoppingListFactory, $scope) {
  var list1 = this;

  var initialList = [
    { name: 'Cookies', quantity: 10 },
    { name: 'Sugary Drinks', quantity: 3 },
    { name: 'Lollies', quantity: 5 },
    { name: 'Toothbrush', quantity: 1 },
    { name: 'Toothpaste', quantity: 1 }
  ];

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory(initialList);

  list1.items = shoppingList.getItems();

  list1.buyItem = function (itemIndex) {
    $scope.list2.addItem(list1.items[itemIndex].name, list1.items[itemIndex].quantity);
    list1.removeItem(itemIndex);
  };

  list1.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  };
}


// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {
  var list2 = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list2.items = shoppingList.getItems();

  list2.addItem = function (name, quantity) {
    shoppingList.addItem(name, quantity);
  }

  list2.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(initialItems) {
  var service = this;

  // List of shopping items
  var items = [];
  if (initialItems !== undefined) {
    items = initialItems;
  }

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
