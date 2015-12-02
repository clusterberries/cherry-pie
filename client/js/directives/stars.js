'use strict';

(function () {
    /* <stars rating="item.rating"></stars> */
    angular.module('cherryApp').directive('stars', [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'views/directives/stars.html',
                scope: {
                    rating: '='     
                },
                link: function (scope, element) {

                }
            };
        }
    ]);
}());
