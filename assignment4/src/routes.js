(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to tab 1 if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/home.html'
      })

      .state('categories', {
        url: '/categories',
        templateUrl: 'src/categories.html',
        controller: 'CategoriesController as categories',
        resolve: {
          catData: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      .state('items', {
        url: '/items/{category}',
        templateUrl: 'src/items.html',
        controller: 'ItemsController as items',
        resolve: {
          itemData: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
            return MenuDataService.getItemsForCategory($stateParams.category);
          }]
        }
      });
  }

})();
