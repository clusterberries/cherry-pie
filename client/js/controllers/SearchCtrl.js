'use strict';

(function () {
    angular.module('cherryApp').controller('SearchCtrl', [
        '$scope',
        'CategoriesSvc',
        'DataLoaderSvc',
        function ($scope, CategoriesSvc, DataLoaderSvc) {
            CategoriesSvc.getTags().then(function(tags) {
                $scope.tags = tags;
            }).catch(function() {});

            $scope.currentTags = [];
            $scope.tagsForSearch = {
                tags: [],
                ingredients: [],
                categories: []
            };

            $scope.sortType = 'name';

            $scope.triggerTags = function (tags, name) {
                $scope.currentTags = tags;
                $scope.currentTags.name = name;
                $scope.isShown = !$scope.isShown;
            };

            $scope.selectTag = function (tag) {
                $scope.tagsForSearch[$scope.currentTags.name].push(tag);
            };

            $scope.search = function () {
                DataLoaderSvc.search({
                    text: $scope.searchText,
                    sort: $scope.sortType,
                    tags: $scope.tagsForSearch.tags,
                    indredients: $scope.tagsForSearch.indredients,
                    categories: $scope.tagsForSearch.categories
                }).then(function (data) {
                    $scope.resultItems = data;
                });
            };
        }
    ]);
}());