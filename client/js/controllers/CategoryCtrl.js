'use strict';

(function () {
    var Config = {
        CONTAINER_CLASSES: ['wide', 'normal', 'narrow', 'narrow2']
    };

    angular.module('cherryApp').controller('CategoryCtrl', [
        '$scope',
        '$state',
        '$element',
        '$interval',
        'CategoriesSvc',
        function ($scope, $state, $element, $interval, CategoriesSvc) {
            var _container = $element[0].querySelector('.container');

            // Set parameters according to the current state
            function init () {
                var categoryParam = $state.params.category;
                var subcategoryParam = $state.params.subcategory;

                $scope.categories.open = false;
                $scope.subcategories.open = false;
                $scope.recipes.open = false;

                $scope.categories.arr = CategoriesSvc.getCategoriesList();
                if (categoryParam === 'all') {
                    $scope.categories.open = true;
                    $scope.subcategories.disabled = true;
                    $scope.recipes.disabled = true;
                } else {
                    $scope.subcategories.arr = CategoriesSvc.getSubcategoriesList(categoryParam);
                    $scope.subcategories.disabled = false;
                    if (!subcategoryParam) {
                        $scope.subcategories.open = true;
                        $scope.recipes.disabled = true;
                    } else {
                        $scope.recipes.disabled = false;
                        $scope.recipes.open = true;
                        $scope.recipes.arr = CategoriesSvc.getRecipesList(subcategoryParam);
                    }
                }
                _setCurrent(categoryParam, subcategoryParam);
                $scope.checkPanelsCount();
                _load();

                _container.addEventListener('click', sendActiveEvent);
                _container.addEventListener('touchstart', sendActiveEvent);
                document.addEventListener('scroll', sendActiveEvent);
            }

            function checkParams(newParams, oldParams) {
                var categoryParam = newParams.category;
                var subcategoryParam = newParams.subcategory;

                if (categoryParam !== oldParams.category) {
                    if (categoryParam === 'all') {
                        $scope.subcategories.disabled = true;
                        $scope.recipes.disabled = true;
                    } else {
                        $scope.subcategories.disabled = false;
                        $scope.subcategories.arr = CategoriesSvc.getSubcategoriesList(categoryParam);
                    }
                }
                if (subcategoryParam !== oldParams.subcategory) {
                    if (!subcategoryParam) {
                        $scope.recipes.disabled = true;
                    } else {
                        $scope.recipes.disabled = false;
                        $scope.recipes.arr = CategoriesSvc.getRecipesList(subcategoryParam);
                    }
                }
                _setCurrent(categoryParam, subcategoryParam);
                _load();
            }

            function _load() {
                if ($state.params.recipe) {
                    _loadRecipe($state.params.recipe);
                } else {
                    _loadViews({
                        category: $state.params.category,
                        subcategory: $state.params.subcategory
                    });
                }
            }

            function _loadViews(options) {
                // TODO: this is temporary, add loading
                // TODO: create nested directives inside preview?
                $scope.items = CategoriesSvc.getFullRecipesList();
/*                CategoriesSvc.getRecipes(options).then(function (data) {
                    // $scope.items = data;
                }).catch(function (error) {
                    console.log('CategoryCtrl ERROR: ' + error);
                });*/
            }

            function _loadRecipe(recipe) {
                CategoriesSvc.getRecipeData(1).then(function (data) {
                    //$scope.currRecipe = data;
                    $scope.$broadcast('recipe/loaded', data);
                }).catch(function (error) {
                    console.log('CategoryCtrl ERROR: ' + error);
                });
            }

            // Search parameters from state in category and subcategory arrays and set them
            function _setCurrent(currCategory, currSubcategory) {
                $scope.categories.arr.some(function (categ) {
                    if (categ.name === currCategory) {
                        $scope.curr.category = categ;
                        return true;
                    }
                });
                $scope.subcategories.arr.some(function (subcateg) {
                    if (subcateg.name === currSubcategory) {
                        $scope.curr.subcategory = subcateg;
                        return true;
                    }
                });
            }

            function sendActiveEvent() {
                $scope.$broadcast('container/active');
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
            $scope.isStateActive = function (state, name, checkNested) {
                // There should be one active link in a panel. Check state and set correct
                if (checkNested && (state === 'category' && $state.params.subcategory && !$state.params.recipe) ||
                        (state === 'subcategory' && $state.params.recipe)) { return false; }
                return $state.params[state] === name;
            };


            /////////////////////////////////////////////////////////
            // Initialization
            /////////////////////////////////////////////////////////
            $scope.categories = { arr: [] };
            $scope.subcategories = { arr: [] };
            $scope.recipes = { arr: [] };
            $scope.curr = { category: '', subcategory: '' };

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