(function () {
    'use strict';

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
                    /* TODO: temporary load the recipes, but with normal db load only needed recipes.
                    But. Think about the best solution. Cause we load recipes even if look 'all' category.
                    Does it make sence to load the whole recipe list? */
                    _recipes = data.recipes;
                }).catch(function (error) {
                    console.log('CategoriesSvc ERROR: ' + error);
                });
            }

            // Load lists of categories and subcategories
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
                // TODO: temporary
                getFullRecipesList: function () {
                    var recipes = [];
                    for (var prop in _recipes) {
                        if (_recipes.hasOwnProperty(prop)) {
                            _recipes[prop].forEach(function (item) {
                                item.subcategory = prop;
                            });
                            recipes = recipes.concat(_recipes[prop]);
                        }
                    }
                    return recipes;
                },
                getRecipes: function (options) {
                    return DataLoaderSvc.getRecipes(options) || [];
                },
                getRecipeData: function (recipeID) {
                    return DataLoaderSvc.getFullRecipe(recipeID) || {};
                },
                isReady: function () {
                    return _isReady;
                },
                getTags: function () {
                    return DataLoaderSvc.getTags();
                }
            };
        }
    ]);
}());