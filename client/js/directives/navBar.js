'use strict';

(function () {
    // <nav-bar panels="panels"></nav-bar>
    angular.module('cherryApp').directive('navBar', [
        function() {
            return {
                templateUrl: 'views/directives/navBar.html',
                scope: {
                    categories: '=categoryPanel',
                    subcategories: '=subcategoryPanel',
                    recipes: '=recipePanel'
                },
                link: function(scope, element, attrs) {
                    scope.categories.open = true;
                    scope.subcategories.open = true;
                    scope.recipes.open = false;

                    scope.currCategory = scope.categories[0];
                    scope.currSubcategory = scope.subcategories[0];

                    scope.triggerPanel = function (panel, isOpen) {
                        if (panel.disabled) { return; }
                        (typeof isOpen === 'bool') ? panel.open = isOpen : panel.open = !panel.open;
                    };
                }
            };
        }
    ]);
}());
