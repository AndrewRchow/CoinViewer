(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('DashboardController', DashboardController);
    DashboardController.$inject = ['$scope', '$window', '$genericService'];

    function DashboardController($scope, $window, $genericService) {

        var vm = this;
        vm.$window = $window;
        vm.$onInit = _init;
        vm.$genericService = $genericService;
        vm.mainArray = undefined;


        function _init() {
            vm.$genericService.getAllUserCoins()
                .then(_getAllUserCoinsSuccess, _callFail);
        }
        function _getAllUserCoinsSuccess(data) {
            vm.mainArray = data.Items;
            vm.$genericService.getCoinMarketData()
                .then(_getCoinMarketDataSuccess, _callFail);
        }
        function _getCoinMarketDataSuccess(data) {
            for (var i = 0; i < vm.mainArray.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (vm.mainArray[i].Symbol == data[j].symbol) {
                        vm.mainArray[i].Price = data[j].price_usd;
                        vm.mainArray[i].Change = data[j].percent_change_24h;
                        break
                    }
                }
            }
        
            for (var i = 0; i < vm.mainArray.length; i++) {
                vm.mainArray[i].TotalInvested = (vm.mainArray[i].NumberOfCoins * vm.mainArray[i].AverageValue).toFixed(2);
                vm.mainArray[i].DifferencePerCoin = (vm.mainArray[i].Price - vm.mainArray[i].AverageValue).toFixed(4);
                if (vm.mainArray[i].DifferencePerCoin > 0) {
                    var childNumb = i + 1;
                    $("tbody tr:nth-child(" + childNumb + ")").find('.difference').addClass('green');
                    $("tbody tr:nth-child(" + childNumb + ")").find('.percent').addClass('green');
                    vm.mainArray[i].DifferencePerCoin = "+" + vm.mainArray[i].DifferencePerCoin;

                }
                if (vm.mainArray[i].DifferencePerCoin < 0) {
                    var childNumb = i + 1;
                    $("tbody tr:nth-child(" + childNumb + ")").find('.difference').addClass('red');
                    $("tbody tr:nth-child(" + childNumb + ")").find('.percent').addClass('red');
                }

                vm.mainArray[i].PercentChangePerCoin = (((vm.mainArray[i].Price / vm.mainArray[i].AverageValue) - 1) * 100).toFixed(2);
                if (vm.mainArray[i].PercentChangePerCoin > 0) {
                    vm.mainArray[i].PercentChangePerCoin = "+" + vm.mainArray[i].PercentChangePerCoin;
                }
                vm.mainArray[i].TotalPrice = (vm.mainArray[i].Price * vm.mainArray[i].NumberOfCoins).toFixed(2);
                vm.mainArray[i].DifferenceTotal = (vm.mainArray[i].Price * vm.mainArray[i].NumberOfCoins) - vm.mainArray[i].TotalInvested;


            }
      
            console.log(vm.mainArray);
        
          
            console.log('hi');
        
        }

        function _callFail(error) {
            console.log(error);
        }
       
    }
})();