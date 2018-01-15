(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('NavbarController', NavbarController);
    NavbarController.$inject = ['$scope', '$window', '$genericService'];

    function NavbarController($scope, $window, $genericService) {

        var vm = this;
        vm.$onInit = _init;
        vm.$genericService = $genericService;
        vm.invested = 0;
        vm.currentCoins = 0;
        vm.revenue = 0;
        vm.currentNet = 0;
        vm.marketData = undefined;
        vm.userCoins = undefined;

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
                    }
                }
            }
            vm.invested = data.Item.Invested;

            vm.revenue = data.Item.Revenue;
            vm.currentNet = vm.currentCoins + vm.revenue;
        }


        function _callFail(error) {
            console.log(error);
        }


       

    }
})();