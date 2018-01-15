(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('AddCoinsController', AddCoinsController);
    AddCoinsController.$inject = ['$scope', '$window', '$addCoinsService', 'toastr'];

    function AddCoinsController($scope, $window, $addCoinsService, toastr) {

        var vm = this;
        vm.$window = $window;
        vm.selected = undefined;
        vm.inputs = {};
        vm.selectedOwned = undefined;
        vm.$onInit = _init;
        vm.$addCoinsService = $addCoinsService;
        vm.coinArrayNames = [];
        vm.coinArrayIds = [];

        vm.currentPrice = undefined;
        vm.send = _send;
        vm.toastr = toastr;
        
        //vm.coinPayload = {};
        //vm.duration = undefined;
        //vm.count = 0;
        //vm.storeMarketCoinNames= _storeMarketCoinNames

        //console.log($('#hiddenUserId').val());

        function _init() {
            
            vm.$addCoinsService.getAllCoinNames()
                .then(_getAllCoinNamesSuccess, _getAllCoinNamesFail);
        }
        function _getAllCoinNamesSuccess(data) {
            vm.coinInfo = data.data.Items;
            for (var i = 0; i < vm.coinInfo.length; i++) {
                vm.coinArrayNames.push(vm.coinInfo[i].CoinName);
                vm.coinArrayIds.push(vm.coinInfo[i].Id);
            }
            console.log(vm.coinArrayNames);
        }
        function _getAllCoinNamesFail(error) {
            console.log(error);
        }

        function _send() {        
            var coinIndex = (vm.coinArrayNames).indexOf(vm.selected);
            if (coinIndex == -1)
            {
                vm.toastr.error("Please select a coin from the list");
            }
            else {
                vm.inputs.coinId = vm.coinArrayIds[coinIndex];
                console.log(vm.inputs);
                vm.$addCoinsService.postAddCoins(vm.inputs)
                    .then(_postAddCoinsSuccess, _postAddCoinsFail);
                
            }
        }
        function _postAddCoinsSuccess(data) {
            console.log(data);
            vm.toastr.success(" Success.");
        }
        function _postAddCoinsFail(error) {
            console.log(error);
        }

        //function _storeMarketCoinNames() {
        //    vm.duration = vm.coinArray.length;
        //    vm.coinPayload.CoinName = vm.coinArray[vm.count];
        //    vm.$addCoinsService.postCoinName(vm.coinPayload)
        //        .then(_storeMarketCoinNamesSuccess, _storeMarketCoinNamesFail);
        //}
        //function _storeMarketCoinNamesSuccess(data) {
        //    console.log(data);
        //    vm.count++;
        //    if (vm.count < vm.duration) {
        //        _send();
        //    }
        //}
        //function _storeMarketCoinNamesFail(error) {
        //    console.log(error);
        //}

    }
})();