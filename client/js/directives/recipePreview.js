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


                    scope.triggerTags = function (tags) {
                        // Hide/open tags or switch to another tab
                        if (scope.currentTags === tags) {
                            scope.isShown = !scope.isShown;
                        } else {
                            scope.isShown = true;
                            scope.currentTags = tags;
                        }
                    };

                    /*** Initialization ***/
                    imageElem.style.backgroundImage = 'url(' + scope.item.imgSmall + ')';
                    scope.isShown = false;
                }
            };
        }
    ]);
}());
