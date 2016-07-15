(function () {
    'use strict';

    angular.module('cherryApp').controller('MainCtrl', [
        '$scope',
        function ($scope) {
            $scope.triggerMenu = function () {
                $scope.activeMenu = !$scope.activeMenu;
                $scope.$broadcast('menu/triggered');
            };
        }
    ]);
}());