(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: 'E',
    scope: {
      foundItems: '<',
      onRemove: '&',
      isEmpty: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var menu = this;

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.found = [];

  menu.getMatchedMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems();

    promise.then(function (response) {
      var foundItems = [];

      var searchTermLower = '';
      if (typeof menu.searchTerm != 'undefined' && menu.searchTerm != '') {
        searchTermLower = menu.searchTerm.toLowerCase();

        //console.log(response.data);
        var mi = response.data.menu_items;
        for (var item in mi) {
          //console.log(response.data.menu_items[item]);
          if (mi[item].description.indexOf(searchTermLower) !== -1) {
            foundItems.push(mi[item]);
          };
        };
      };
      //console.log(foundItems);
      menu.found = foundItems;
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  menu.isEmpty = function () {
    return typeof menu.found == 'undefined' || menu.found.length == 0;
  };

  menu.removeItem = function (index) {
//    MenuSearchService.removeItem(index);
    menu.found.splice(index, 1);
  }
}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  this.found = [];

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };
}

})();
