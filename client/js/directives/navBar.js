'use strict';

// TODO: there should be link in the top of panel with all dishes in this category

(function () {
    /* <nav-bar
        category-panel="categories"
        subcategory-panel="subcategories"
        recipe-panel="recipes"
        current="curr"
        check-panels="checkPanelsCount"
        is-state-active="isStateActive(state, name)"></nav-bar> */
    angular.module('cherryApp').directive('navBar', [
        '$timeout',
        '$window',
        function ($timeout, $window) {
            return {
                restrict: 'AE',
                templateUrl: 'views/directives/navBar.html',
                scope: {
                    categories: '=categoryPanel',
                    subcategories: '=subcategoryPanel',
                    recipes: '=recipePanel',
                    current: '=',
                    checkPanels: '&',           // is used to control with of nav bar and right container
                    isStateActive: '&'          // function to check is a link active
                },
                link: function ($scope, element) {
                    var BOUNDING_WIDTH = 1100;
                    var BOUNDING_WIDTH_MIN = 860;
                    var _isMinimized = $window.innerWidth < BOUNDING_WIDTH;

                    function closePanels() {
                        $scope.triggerPanel($scope.categories, false);
                        $scope.triggerPanel($scope.subcategories, false);
                        $scope.triggerPanel($scope.recipes, false);
                    }

                    function handleResize() {
                        var isMinimizedNew =  $window.innerWidth < BOUNDING_WIDTH;
                        //var isMinimizedNew =  $window.innerWidth < BOUNDING_WIDTH_MIN;
                        //if (_isMinimized === isMinimizedNew) { return; }

                        _isMinimized = isMinimizedNew;
                        if (_isMinimized) {
                            closePanels();
                        }
                    }

                    function onMenuTrigger(event, isOpen) {
                        if (!$scope.recipes.disabled) {
                            $scope.triggerPanel($scope.recipes, isOpen);
                        } else if (!$scope.subcategories.disabled) {
                            $scope.triggerPanel($scope.subcategories, isOpen);
                        } else {
                            $scope.triggerPanel($scope.categories, isOpen);
                        }
                    }

                    $scope.triggerPanel = function (panel, isOpen) {
                        panel.open = (typeof isOpen === 'boolean') ? isOpen : !panel.open;
                        $scope.$emit('panel/triggered', panel.open);
                        // Wait while state will change and then check the width
                        $timeout($scope.checkPanels, 100);
                    };

                    $scope.stayOpen = function (event) {
                        event.stopPropagation();
                        // Wait while state will change and then check the width
                        $timeout($scope.checkPanels, 100);
                    };

                    $window.addEventListener('resize', handleResize);
                    $scope.$on('container/active', closePanels);
                    $scope.$on('menu/triggered', onMenuTrigger);

                    _isMinimized && closePanels(); // TODO: do this after event
                }
            };
        }
    ]);
}());
