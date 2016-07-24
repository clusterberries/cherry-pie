(function () {
    'use strict';

    var app = angular.module('cherryApp', [
        'ui.router',
        'ngAnimate'
    ]);

    app.constant('ROUTES', {
        //MAIN: '/',
        RECIPES: '/recipes',
        CATEGORY: '/:category',
        CATEGORY_All: '/recipes/all',
        SUBCATEGORY: '/:subcategory',
        RECIPE: '/:recipe',
        SEARCH: '/search',
        ABOUT: '/about'
    });

    app.config(['$stateProvider', '$urlRouterProvider', 'ROUTES',
        function($stateProvider, $urlRouterProvider, ROUTES) {

            $urlRouterProvider.otherwise(ROUTES.CATEGORY_All);

            $stateProvider
            .state('recipes', {
                url: ROUTES.RECIPES,
                templateUrl: 'components/category/mainRecipesView.html',
                abstract: true,
                controller: 'CategoryCtrl'
            })
            .state('recipes.category', {
                url: ROUTES.CATEGORY,
                templateUrl: 'components/category/category.html'
            })
            .state('recipes.category.subcategory', {
                url: ROUTES.SUBCATEGORY,
                templateUrl: 'components/category/category.html'
            })
            .state('recipes.category.subcategory.recipe', {
                url: ROUTES.RECIPE,
                templateUrl: 'components/recipe/recipe.html',
                controller: 'RecipeCtrl'
            })
            .state('search', {
                url: ROUTES.SEARCH,
                templateUrl: 'components/search/search.html',
                controller: 'SearchCtrl'
            })
            .state('about', {
                url: ROUTES.ABOUT,
                templateUrl: 'components/about/about.html'
            });
        }
    ]);

    app.run([
        '$rootScope',
        '$state',
        '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);


}());