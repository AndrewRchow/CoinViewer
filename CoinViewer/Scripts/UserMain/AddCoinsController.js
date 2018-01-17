(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('AddCoinsController', AddCoinsController);
    AddCoinsController.$inject = ['$scope', '$window', '$genericService', 'toastr'];

    function AddCoinsController($scope, $window, $genericService, toastr) {

        var vm = this;
        vm.$window = $window;
        vm.selected = undefined;
        vm.inputs = {};
        vm.selectedOwned = undefined;
        vm.$onInit = _init;
        vm.$genericService = $genericService;
        vm.coinArrayNames = [];
        vm.coinArrayIds = [];
        vm.send = _send;
        vm.toastr = toastr;

        //vm.symbolArray = [];
        //vm.coinArray = [];
        //vm.coinPayload = {};
        //vm.duration = undefined;
        //vm.count = 0;
        //vm.storeMarketCoinNames = _storeMarketCoinNames;


        function _init() {
            
            vm.$genericService.getAllCoinNames()
                .then(_getAllCoinNamesSuccess, _callFail);
        }
        function _getAllCoinNamesSuccess(data) {
            vm.coinInfo = data.Items;
            for (var i = 0; i < vm.coinInfo.length; i++) {
                vm.coinArrayNames.push(vm.coinInfo[i].CoinName);
                vm.coinArrayIds.push(vm.coinInfo[i].Id);
            }
            console.log(vm.coinArrayNames);
        }

        function _send() {        
            var coinIndex = (vm.coinArrayNames).indexOf(vm.selected);
            if (coinIndex == -1)
            {
                vm.toastr.error("Please select a coin from the list");
            }
            else if (vm.inputs.numberPurchased <= 0 || vm.inputs.currentPrice <= 0) {
                vm.toastr.error("Please input a correct number");
            }
            else {
                vm.inputs.coinId = vm.coinArrayIds[coinIndex];
                console.log(vm.inputs);
                vm.$genericService.postAddCoins(vm.inputs)
                    .then(_postAddCoinsSuccess, _callFail);
                
            }
        }
        function _postAddCoinsSuccess(data) {
            console.log(data);
            vm.inputs.TransactionType = "Buy";
            vm.$genericService.postHistory(vm.inputs)
                .then(_postHistorySuccess, _callFail);           
        }
        function _postHistorySuccess(data) {
            console.log(data);
            vm.toastr.success(" Success.");
            vm.inputs = null;
            vm.selected = null;
        }

        function _callFail(error) {
            console.log(error);
        }



        //function _init() {
        //    vm.$genericService.getCoinMarketData()
        //        .then(_getCoinMarketDataSuccess, _callFail);
        //}
        //function _getCoinMarketDataSuccess(data) {
        //    console.log(data);
        //    for (var i = 0; i < data.length; i++) {
        //        vm.coinArray[i] = data[i].name + " (" + data[i].symbol + ")";
        //        vm.symbolArray[i] = data[i].symbol;
        //    }
        //    console.log(vm.coinArray);
        //    console.log(vm.symbolArray);
        //}
        //function _storeMarketCoinNames() {
        //    vm.duration = vm.coinArray.length;
        //    vm.coinPayload.coinName = vm.coinArray[vm.count];
        //    vm.coinPayload.symbol = vm.symbolArray[vm.count];

        //    vm.$genericService.postCoinName(vm.coinPayload)
        //        .then(_storeMarketCoinNamesSuccess, _storeMarketCoinNamesFail);
        //}
        //function _storeMarketCoinNamesSuccess(data) {
        //    console.log(data);
        //    vm.count++;
        //    if (vm.count < vm.duration) {
        //        _storeMarketCoinNames();
        //    }
        //}
        //function _storeMarketCoinNamesFail(error) {
        //    console.log(error);
        //}

    }
})();