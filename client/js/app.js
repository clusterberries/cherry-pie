'use strict';

(function () {
    var app = angular.module('cherryApp', [
        'ui.router',
        'ngAnimate'
    ]);

    app.constant('ROUTES', {
        //MAIN: '/',
        RECIPES: '/recipes',
        CATEGORY: '/:category',
        CATEGORY_All: '/recipes/all',
        SUBCATEGORY: '/:category/:subcategory',
        RECIPE: '/:category/:subcategory/:recipe',
        SEARCH: '/search',
        ABOUT: '/about'
    });

    app.config(['$stateProvider', '$urlRouterProvider', 'ROUTES',
        function($stateProvider, $urlRouterProvider, ROUTES) { 

            $urlRouterProvider.otherwise(ROUTES.CATEGORY_All);

            $stateProvider
            // .state('main', {
            //     url: ROUTES.MAIN,
            //     templateUrl: 'views/main.html',
            //     controller: 'MainCtrl',
            //     abstract: true
            // }) 
            .state('recipes', {
                url: ROUTES.RECIPES,
                templateUrl: 'views/recipesMain.html',
                abstract: true,
                controller: 'CategoryCtrl'
            })          
            .state('recipes.category', {
                url: ROUTES.CATEGORY,
                templateUrl: 'views/category.html',
                //controller: 'CategoryCtrl'
            })
            .state('recipes.subcategory', {
                url: ROUTES.SUBCATEGORY,
                templateUrl: 'views/subcategory.html'

            })
            .state('recipes.recipe', {
                url: ROUTES.RECIPE,
                templateUrl: 'views/recipe.html',
                controller: 'RecipeCtrl'
            })
            .state('search', {
                url: ROUTES.SEARCH,
                templateUrl: 'views/search.html',
                controller: 'SearchCtrl'
            })
            .state('about', {
                url: ROUTES.ABOUT,
                templateUrl: 'views/about.html'
                //controller: 'Controller'
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
    ])


}()); 