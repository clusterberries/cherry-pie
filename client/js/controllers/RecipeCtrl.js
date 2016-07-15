'use strict';

(function () {
    angular.module('cherryApp').controller('RecipeCtrl', [
        '$scope',
        '$rootScope',
        '$element',
        '$sce',
        '$document',
        function ($scope, $rootScope, $element, $sce, $document) {
            var _popup;

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

            function removePopup() {
                $rootScope.$apply(function () {
                    _popup.remove();
                    //_popup = null;
                });
            }

            $scope.openImage = function (link) {
                var template =
                    '<div class="dark-background"><div class="popup">' +
                        '<div class="close-cross"></div>' +
                        '<img src="' + link + '">' +
                    '</div></div>';
                $document[0].body.querySelector('main').innerHTML += template;
                _popup = $document[0].body.querySelector('.dark-background');
                _popup.querySelector('.close-cross').addEventListener('click', removePopup);
            };

            $scope.$on('recipe/loaded', init);
        }

        // TODO: watch destroy, set currRecipe = null
    ]);
}());