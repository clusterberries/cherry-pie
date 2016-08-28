(function () {
    'use strict';

    /* <stars rating="item.rating"></stars> */
    angular.module('cherryApp').directive('stars', [
        function () {
            var STAR_FULL_ICON = 'star-full-icon.svg';
            var STAR_ICON = 'star-icon.svg';
            var STARS_COUNT = 10;
            return {
                restrict: 'E',
                templateUrl: 'components/common/starts/stars.html',
                replace: true,
                scope: {
                    rating: '='
                },
                link: function (scope, element) {
                    function setStars() {
                        scope.urls = [];
                        for (var i = 0; i < STARS_COUNT; ++i) {
                            scope.urls.push((i < scope.rating) ? STAR_FULL_ICON : STAR_ICON);
                        }
                    }

                    scope.$watch('rating', setStars);
                }
            };
        }
    ]);
}());
