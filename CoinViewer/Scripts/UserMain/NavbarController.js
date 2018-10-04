(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('NavbarController', NavbarController);
    NavbarController.$inject = ['$scope', '$window', '$genericService', '$location'];

    function NavbarController($scope, $window, $genericService, $location) {

        var vm = this;
        vm.$onInit = _init;
        vm.$genericService = $genericService;
        vm.invested = 0;
        vm.currentCoins = 0;
        vm.revenue = 0;
        vm.currentNet = 0;
        vm.marketData = undefined;
        vm.userCoins = undefined;
        vm.$location = $location;

        function _init() {
            vm.$genericService.getCoinMarketData()
                .then(_getCoinMarketDataSuccess, _callFail);
        }
        function _getCoinMarketDataSuccess(data) {
            vm.marketData = data;
            vm.$genericService.getAllUserCoins()
                .then(_getAllUserCoinsSuccess, _callFail);
        }
        function _getAllUserCoinsSuccess(data) {
            vm.userCoins = data.Items;
            vm.$genericService.getUserInvestment()
                .then(_getUserInvestmentSuccess, _callFail)
        }
        function _getUserInvestmentSuccess(data)
        {
            console.log(data);

            console.log(vm.marketData);
            console.log(vm.userCoins);

            for (var i = 0; i < vm.userCoins.length; i++) {
                for (var j = 0; j < vm.marketData.length; j++) {
                    if (vm.marketData[j].symbol == vm.userCoins[i].Symbol)
                    {
                        vm.currentCoins = vm.currentCoins + (vm.userCoins[i].NumberOfCoins * vm.marketData[j].price_usd);
                        break
                    }
                }
            }
            vm.currentCoins = vm.currentCoins.toFixed(2);
            vm.invested = (data.Item.Invested).toFixed(2);
            vm.revenue = (data.Item.Revenue).toFixed(2);
            vm.currentNet = (parseFloat(vm.currentCoins, 10) + parseFloat(vm.revenue, 10)).toFixed(2);
<<<<<<< HEAD
            if (vm.currentNet < vm.invested) {
                $(".container #lastInfo span").addClass('red');

            }


              //Insert Names of all coins
            //for (let i = 0; i < vm.marketData.length; i++) {
            //    let coin = {
            //        CoinName: vm.marketData[i].name,
            //        Symbol: vm.marketData[i].symbol
            //    }
            //    vm.$genericService.postCoinName(coin)
            //        .then(_postCoinNameSuccess, _postCoinNameFail);
            //}
=======
>>>>>>> 24eef804daba33faa70092aca4950c202b1896bb
        }


        function _callFail(error) {
            console.log(error);
        }
<<<<<<< HEAD


        //function _postCoinNameSuccess(data) {
        //    console.log(data);
        //}

        //function _postCoinNameFail(error) {
        //    console.log(error);
        //}

=======
>>>>>>> 24eef804daba33faa70092aca4950c202b1896bb
    }
})();