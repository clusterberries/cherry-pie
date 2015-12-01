'use strict';

(function () {
    var Config = {
        CONTAINER_CLASSES: ['wide', 'normal', 'narrow', 'narrow2']
    };

    angular.module('cherryApp').controller('CategoryCtrl', [
        '$scope', 
        '$state',
        '$interval',
        'CategoriesSvc',
        function ($scope, $state, $interval, CategoriesSvc) {
            function init () {
                var categoryParam = $state.params.category;
                var subcategoryParam = $state.params.subcategory;

                $scope.categories.open = false;
                $scope.subcategories.open = false;
                $scope.recipes.open = false;

                $scope.categories = CategoriesSvc.getCategoriesList();
                if (categoryParam === 'all') {
                    $scope.categories.open = true;
                    $scope.subcategories.disabled = true;
                    $scope.recipes.disabled = true;
                } else {
                    $scope.subcategories.disabled = false;
                    $scope.subcategories = CategoriesSvc.getSubcategoriesList(categoryParam);
                    if (!subcategoryParam) { 
                        $scope.subcategories.open = true;
                        $scope.recipes.disabled = true;
                    } else {
                        $scope.recipes.disabled = false;
                        $scope.recipes.open = true;
                        $scope.recipes = CategoriesSvc.getRecipesList(subcategoryParam);
                    }
                }
                $scope.checkPanelsCount();
                //_load();
            }

            function checkParams(newParams, oldParams) {
                // TODO: rewrite this pretty terrible structure
                if (newParams.category !== oldParams.category) {
                    if (newParams.category === 'all') {
                        $scope.subcategories.disabled = true;
                        $scope.recipes.disabled = true;
                    } else {
                        $scope.subcategories.disabled = false;
                        $scope.subcategories = CategoriesSvc.getSubcategoriesList(newParams.category);
                    }
                }
                if (newParams.subcategory !== oldParams.subcategory) {
                    if (!newParams.subcategory) {
                        $scope.recipes.disabled = true;
                    } else {
                        $scope.recipes.disabled = false;
                        $scope.recipes = CategoriesSvc.getRecipesList(newParams.subcategory);
                    }
                }
                $scope.checkPanelsCount();
                //_load();
            }

            function _load() {
                if ($state.params.recipe) {
                    loadRecipe($state.params.recipe);
                } else {
                    loadViews();
                }
            }

            function loadViews(options) {
                CategoriesSvc.getRecipes(options).then(function (data) {
                    // $scope.recipesPreview = data;
                }).catch(function (error) {
                    console.log('CategoryCtrl ERROR: ' + error);
                });
            }

            function loadRecipe(recipe) {
                CategoriesSvc.getRecipeData(recipe).then(function (data) {
                    // $scope.currRecipe = data;
                }).catch(function (error) {
                    console.log('CategoryCtrl ERROR: ' + error);
                });
            }

            // Recount panels
            $scope.checkPanelsCount = function () {
                var count = 0;
                $scope.categories.open && count++;
                !$scope.subcategories.disabled && $scope.subcategories.open && count++;
                !$scope.recipes.disabled && $scope.recipes.open && count++;
                $scope.containerClass = Config.CONTAINER_CLASSES[count];
            }

            // Function for nav-bar
            $scope.isStateActive = function (state, name) {
                return $state.params[state] === name;
            };


            /////////////////////////////////////////////////////////
            // Initialization
            /////////////////////////////////////////////////////////
            $scope.categories = [];
            $scope.subcategories = [];
            $scope.recipes = [];            

            // Wait while the answer from server will be received
            var _checkInterval = $interval(function () {
                if (CategoriesSvc.isReady()) {
                    $interval.cancel(_checkInterval);
                    init();
                    $scope.$watch(function () {
                        return $state.params;
                    }, checkParams);
                }
            }, 100);
        }
    ]);
}());