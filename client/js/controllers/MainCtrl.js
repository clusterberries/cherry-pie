'use strict';

(function () {
    angular.module('cherryApp').controller('MainCtrl', [
        '$scope',
        function ($scope) {
            $scope.triggerMenu = function () {
                $scope.activeMenu = !$scope.activeMenu;
                $scope.$broadcast('menu/triggered', $scope.activeMenu);
            };

            $scope.$on('panel/triggered', function (event, isOpen) {
                $scope.activeMenu = isOpen;
            });
        }
    ]);
}());