'use strict';

// TODO: there should be link in the top of panel with all dishes in this category

(function () {
    /* <nav-bar 
        category-panel="categories" 
        subcategory-panel="subcategories" 
        recipe-panel="recipes" 
        check-panels="checkPanelsCount" 
        is-state-active="isStateActive(state, name)"></nav-bar> */
    angular.module('cherryApp').directive('navBar', [
        function () {
            return {
                restrict: 'AE',
                templateUrl: 'views/directives/navBar.html',
                scope: {
                    categories: '=categoryPanel',
                    subcategories: '=subcategoryPanel',
                    recipes: '=recipePanel',
                    checkPanels: '&',     // is used to control with of nav bar and right container
                    isStateActive: '&'              // function to check is a link active      
                },
                link: function (scope, element) {
                    scope.triggerPanel = function (panel, isOpen) {
                        panel.open = (typeof isOpen === 'boolean') ? isOpen : !panel.open;
                        scope.checkPanels();
                    };                    

                    scope.stopClose = function (event) {
                        event.stopPropagation();
                    };

                    /////////////////////////////////////////////////////////
                    // Initialization
                    /////////////////////////////////////////////////////////
                    // TODO this is temporary
                    scope.currCategory = scope.categories[1];
                }
            };
        }
    ]);
}());
