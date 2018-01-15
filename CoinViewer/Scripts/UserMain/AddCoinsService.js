(function () {
    'use strict';
    angular
        .module('mainApp')
        .service('$addCoinsService', AddCoinsService);
    AddCoinsService.$inject = ['$http', '$q'];

    function AddCoinsService($http, $q) {
        return {
            getAllCoinNames: _getAllCoinNames
            , postCoinName: _postCoinName
            , postAddCoins: _postAddCoins
        };

        function _getAllCoinNames() {
            return $http.get('/api/coin', { withCredentials: true })
                .then(_getAllCoinNamesComplete, _getAllCoinNamesFail);
        }
        function _getAllCoinNamesComplete(data) {
            return data;
        }
        function _getAllCoinNamesFail(err) {
            return $q.reject(err);
        }

        function _postCoinName(data) {
            return $http.post('/api/coin', data, { withCredentials: true })
                .then(_postCoinNameComplete, _postCoinNameFailed);
        }
        function _postCoinNameComplete(response) {
            return response;
        }
        function _postCoinNameFailed(error) {
            return $q.reject(error);
        }

        function _postAddCoins(data) {
            return $http.post('/api/coin/user/add', data, { withCredentials: true })
                .then(_postAddCoinsComplete, _postAddCoinsFailed);
        }
        function _postAddCoinsComplete(response) {
            return response;
        }
        function _postAddCoinsFailed(error) {
            return $q.reject(error);
        }


        //function _getAllCoinsValue() {
        //    var settings = {
        //        url: " https://api.coinmarketcap.com/v1/ticker/?limit=0",
        //        method: "GET",
        //        cache: false,
        //        responseType: "json",
        //        withCredentials: false
        //    };
        //    return $http(settings)
        //        .then(_getAllCoinsValueComplete, _getAllCoinsValueFail);
        //}
        //function _getAllCoinsValueComplete(data) {
        //    return data;
        //}
        //function _getAllCoinsValueFail(err) {
        //    return $q.reject(err);
        //}

    }
})();