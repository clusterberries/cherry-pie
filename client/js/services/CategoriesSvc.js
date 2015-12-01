'use strict';

(function () {
    angular.module('cherryApp').factory('CategoriesSvc', [ 
        'DataLoaderSvc', 
        function (DataLoaderSvc) {
            var _categories,
                _subcategories,
                _recipes, 
                _isReady = false;

            function getAllCategories() {
                DataLoaderSvc.getCategories().then(function (data) {
                    _isReady = true;
                    _categories = data.categories;
                    _subcategories = data.subcategories;
                    _recipes = data.recipes;
                }).catch(function (error) {
                    console.log('CategoriesSvc ERROR: ' + error);
                });
            }

            getAllCategories();

            return {
                getCategoriesList: function () {
                    return _categories || [];
                },
                getSubcategoriesList: function (category) {
                    return _subcategories[category] || [];
                },
                getRecipesList: function (subcategory) {
                    return _recipes[subcategory] || [];
                },
                getRecipes: function (options) {
                    return DataLoaderSvc.getRecipes(options) || [];
                },
                getRecipeData: function (recipe) {
                    return DataLoaderSvc.getFullRecipe(recipe) || {};
                },
                isReady: function () {
                    return _isReady;
                }
            };
        }
    ]);
}());