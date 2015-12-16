'use strict';

(function () {
    angular.module('cherryApp').controller('RecipeCtrl', [
        '$scope',
        '$element',
        '$sce',
        function ($scope, $element, $sce) {
            function init(event, recipe) {
                $scope.cooking = arrToHtml(recipe.cooking);
                delete recipe.cooking;
                angular.extend($scope, recipe);

                var imageMain = $element[0].getElementsByClassName('img-main')[0];
                imageMain.style.backgroundImage = 'url(' + $scope.imgMain + ')';
            }

            function arrToHtml(textArr) {
                var text = '';
                textArr.forEach(function(item) {
                    text += '<p>' + item + '</p>';
                });

                return $sce.trustAsHtml(text);
            }

            $scope.$on('recipe/loaded', init);
        }

        // TODO: watch destroy, set currRecipe = null
    ]);
}());