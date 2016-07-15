'use strict';

(function () {
    angular.module('cherryApp').factory('DataLoaderSvc', [
        '$q',
        '$http',
        function ($q, $http) {
            function getData(url) {
                var deff = $q.defer();
                $http.get(url)
                    .success(function (data) {
                        deff.resolve(data);
                    })
                    .error(function (error) {
                        deff.reject(error);
                    });
                return deff.promise;
            }

            function postData(url, data) {
                var deff = $q.defer();
                $http.post(url, data)
                    .success(function (data) {
                        deff.resolve(data);
                    })
                    .error(function (error) {
                        deff.reject(error);
                    });
                return deff.promise;
            }

            var loader = {
                getCategories: function () {
                    return getData('/api/categories');
                },
                getRecipes: function (options) {
                    return getData('/api/' + options.category + '/' + options.subcategory);
                },
                getFullRecipe: function (recipe) {
                    return getData('/api/recipe/' + recipe);
                },
                getTags: function (recipe) {
                    return getData('/api/tags');
                },
                search: function (options) {
                    return postData('/api/search', options);
                }
            };

            return loader;
        }
    ]);
}());