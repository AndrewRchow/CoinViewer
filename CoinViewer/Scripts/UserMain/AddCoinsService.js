(function () {
    'use strict';
    angular
        .module('mainApp')
        .service('AddCoinsService', AddCoinsService);
    AddCoinsService.$inject = ['$http', '$q'];

    function AddCoinsService($http, $q) {
        return {
            getAllCoinsValue: _getAllCoinsValue
        };

        function _getAllCoinsValue() {
            var settings = {
                url: " https://api.coinmarketcap.com/v1/ticker/?limit=0",
                method: "GET",
                cache: false,
                responseType: "json",
                withCredentials: false
            };
            return $http(settings)
                .then(_getAllCoinsValueComplete, _getAllCoinsValueFail);
        }
        function _getAllCoinsValueComplete(data) {
            return data;
        }
        function _getAllCoinsValueFail(err) {
            return $q.reject(err);
        }
    }
})();