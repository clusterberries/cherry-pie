'use strict';

(function () {
    /* <recipe-preview item="item"></recipe-preview> */
    angular.module('cherryApp').directive('recipePreview', [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'views/directives/recipePreview.html',
                replace: true,
                scope: {
                    item: '='     
                },
                link: function (scope, element) {
                    var imageElem = element[0].getElementsByClassName('img-preview')[0];
                    // TODO: why jquery doesn't work here?
                    var imageElem2 = element.find('.img-preview');

                    imageElem.style.backgroundImage = 'url(' + scope.item.imgSmall + ')';

                    // TODO: set url as .style.backgroundImage
                }
            };
        }
    ]);
}());
