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
        function ($timeout) {
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
                link: function (scope, element) {
                    scope.triggerPanel = function (panel, isOpen) {
                        panel.open = (typeof isOpen === 'boolean') ? isOpen : !panel.open;
                        // Wait while state will change and then check the width
                        $timeout(scope.checkPanels, 100);
                    };                    

                    scope.stopClose = function (event) {
                        event.stopPropagation();
                        // Wait while state will change and then check the width
                        $timeout(scope.checkPanels, 100);
                    };
                }
            };
        }
    ]);
}());
