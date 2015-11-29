'use strict';

// TODO: there should be link in the top of panel with all dishes in this category

(function () {
    /* <nav-bar 
        category-panel="categories" 
        subcategory-panel="subcategories" 
        recipe-panel="recipes" 
        panel-width="countOpenedPanels" 
        is-state-active="isStateActive(state, name)"></nav-bar> */
    angular.module('cherryApp').directive('navBar', [
        function() {
            return {
                restrict: 'AE',
                templateUrl: 'views/directives/navBar.html',
                scope: {
                    categories: '=categoryPanel',
                    subcategories: '=subcategoryPanel',
                    recipes: '=recipePanel',
                    openedCount: '=panelWidth',     // is used to control with of nav bar and right container
                    isStateActive: '&'              // function to check is a link active      
                },
                link: function(scope, element, attrs) {
                    // Recount panels
                    function checkPanelsCount() {
                        var count = 0;
                        scope.categories.open && count++;
                        !scope.subcategories.disabled && scope.subcategories.open && count++;
                        !scope.recipes.disabled && scope.recipes.open && count++;
                        scope.openedCount = count;
                    }

                    scope.triggerPanel = function (panel, isOpen) {
                        if (panel.disabled) { return; }
                        panel.open = (typeof isOpen === 'bool') ? isOpen : !panel.open;
                        checkPanelsCount();
                    };                    

                    scope.stopClose = function (event) {
                        event.stopPropagation();
                    };

                    /////////////////////////////////////////////////////////
                    // Initialization
                    /////////////////////////////////////////////////////////
                    scope.categories.open = true;
                    scope.subcategories.open = false;
                    scope.recipes.open = false;

                    scope.currCategory = scope.categories[1];

                    checkPanelsCount();
                }
            };
        }
    ]);
}());
