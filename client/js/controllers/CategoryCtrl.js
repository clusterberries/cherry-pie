'use strict';

(function () {
    angular.module('cherryApp').controller('CategoryCtrl', [
        '$scope', 
        '$state', 
        function ($scope, $state) {

            function checkParams (newParams, oldParams) {

            }

            $scope.$watch(function() {
                return $state.params;
            }, checkParams);

            $scope.categories = [
                {
                    name: 'maincourse',
                    viewName: 'Основные блюда',
                    titleName: 'К основным блюдам'
                },
                {
                    name: 'desserts', 
                    viewName: 'Десерты',
                    titleName: 'К десертам'
                }
            ];
            $scope.subcategories = [
                {
                    name: 'cakes',
                    viewName: 'Торты',
                    titleName: 'К тортам'
                },
                {
                    name: 'pies', 
                    viewName: 'Пироги',
                    titleName: 'К пирогам'
                }
            ];
            $scope.recipes = [
                {
                    name: 'napoleon',
                    viewName: 'Наполеон'
                },
            ];

            $scope.triggerPanel = function (panel) {
                
            };
        }
    ]);
}());