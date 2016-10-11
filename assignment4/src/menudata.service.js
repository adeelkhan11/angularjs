(function () {
  'use strict';

  angular.module('Data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http', 'ApiBasePath']
  function MenuDataService($http, ApiBasePath) {
    var service = this;

    this.found = [];

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.getAllCategories = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      }).then(function (response) {
        return response.data;
      });

      return response;
    };

    service.getItemsForCategory = function (categoryShortName) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
      }).then(function (response) {
        return response.data;
      });

      return response;
    };
  }


})();
