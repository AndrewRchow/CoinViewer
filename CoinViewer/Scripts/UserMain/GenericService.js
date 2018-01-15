(function () {
    'use strict';
    angular
        .module('mainApp')
        .service('$genericService', GenericService);
    GenericService.$inject = ['$http', '$q'];

    function GenericService($http, $q) {
        return {
              getCoinMarketData: _getCoinMarketData
            , getAllCoinNames: _getAllCoinNames
            , postCoinName: _postCoinName
            , postAddCoins: _postAddCoins
            , postHistory: _postHistory
            , getAllUserCoins: _getAllUserCoins
            , getUserInvestment: _getUserInvestment
        };
        function _getCoinMarketData() {
            return $http.get('https://api.coinmarketcap.com/v1/ticker/?limit=0').then(handleSuccess).catch(handleError('Error update status'));
        }

        function _getAllCoinNames() {
            return $http.get('/api/coin').then(handleSuccess).catch(handleError('Error update status'));
        }

        function _postCoinName(data) {
            return $http.post('/api/coin', data).then(handleSuccess).catch(handleError('Error update status'));
        }

        function _postAddCoins(data) {
            return $http.post('/api/coin/user/add', data).then(handleSuccess).catch(handleError('Error update status'));
        }

        function _postHistory(data) {
            return $http.post('/api/coin/user/history', data).then(handleSuccess).catch(handleError('Error update status'));
        }

        function _getAllUserCoins() {
            return $http.get('/api/coin/user/allCoins').then(handleSuccess).catch(handleError('Error update status'));
        }

        function _getUserInvestment() {
            return $http.get('/api/coin/user/investmentNumbers').then(handleSuccess).catch(handleError('Error update status'));
        }

        function handleSuccess(response) {
            return response.data;
        };
        function handleError(error) {
            return {
                success: false,
                message: error.data
            }
        };





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