(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('SellCoinsController', SellCoinsController);
    SellCoinsController.$inject = ['$scope', '$window', 'toastr', '$genericService'];

    function SellCoinsController($scope, $window, toastr, $genericService) {

        var vm = this;
        vm.$window = $window;
        vm.selected = undefined;
        vm.$onInit = _init;
        vm.coinArray = [];
        vm.inputs = {};
        vm.currentPrice = undefined;
        vm.$genericService = $genericService;
        vm.coinArrayNames = [];
        vm.coinArrayIds = [];
        vm.currentQty = undefined;
        vm.send = _send;
        vm.toastr = toastr;

        function _init() {
            vm.$genericService.getAllUserCoins()
                .then(_getAllUserCoinsSuccess, _callFail);
        }

        function _getAllUserCoinsSuccess(data) {
            console.log('hi');
            console.log(data)
            vm.coinInfo = data.Items;
            vm.coinArrayNames = [];
            for (var i = 0; i < vm.coinInfo.length; i++) {
                vm.coinArrayNames.push(vm.coinInfo[i].CoinName);
                vm.coinArrayIds.push(vm.coinInfo[i].Id);
            }
            console.log(vm.coinArrayNames);

        }

        function _send() {
            var coinIndex = (vm.coinArrayNames).indexOf(vm.selected);
            if (coinIndex == -1) {
                vm.toastr.error("Please select a coin from the list");
            }
            else if (vm.inputs.numberSold <= 0 || vm.inputs.currentPrice <= 0) {
                vm.toastr.error("Please input a correct number");
            }
            else {
                for (var i = 0; i < vm.coinInfo.length; i++) {
                    if (vm.coinInfo[i].CoinName == vm.selected) {
                        vm.currentQty = vm.coinInfo[i].NumberOfCoins;
                        console.log(vm.currentQty);
                        break
                    }
                }
                if (vm.inputs.numberSold > vm.currentQty) {
                    vm.toastr.error("You do not have enough coins to sell");
                }
                else {
                    console.log(coinIndex);
                    vm.inputs.coinId = vm.coinArrayIds[coinIndex];
                    console.log(vm.inputs);
                    vm.$genericService.postSellCoins(vm.inputs)
                        .then(_postSellCoinsSuccess, _callFail);
                }
            }
        }
        function _postSellCoinsSuccess() {
            vm.inputs.TransactionType = "Sell";
            vm.$genericService.postHistory(vm.inputs)
                .then(_postHistorySuccess, _callFail); 
        }
        function _postHistorySuccess() {
            vm.toastr.success("Success.");
            _init();
        }

        function _callFail(error) {
            console.log(error);
        }



    }
})();