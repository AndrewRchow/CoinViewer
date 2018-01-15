(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('AddCoinsController', AddCoinsController);
    AddCoinsController.$inject = ['$scope', '$window', 'AddCoinsService', 'toastr'];

    function AddCoinsController($scope, $window, AddCoinsService, toastr) {

        var vm = this;
        vm.$window = $window;
        vm.selected = undefined;
        vm.$onInit = _init;
        vm.AddCoinsService = AddCoinsService;
        vm.coinArray = [];
        vm.currentPrice = undefined;
        vm.send = _send;
        vm.toastr = toastr;
        //vm.test = _test;

        function _init() {
            console.log('hi');
            vm.AddCoinsService.getAllCoinsValue()
                .then(_getAllCoinsValueSuccess, _getAllCoinsValueFail);
        }
        function _getAllCoinsValueSuccess(data) {
            console.log(data.data);
            vm.coinInfo = data.data;
            for (var i = 0; i < vm.coinInfo.length; i++) {
                vm.coinArray.push(vm.coinInfo[i].name + ' (' + vm.coinInfo[i].symbol + ')');
            }
            console.log(vm.coinArray);
        }
        function _getAllCoinsValueFail(error) {
            console.log(error);
        }

        //function _test() {
        //    console.log(vm.selected);
        //}

        function _send() {
            
            var coinIndex = (vm.coinArray).indexOf(vm.selected);
            if (coinIndex == -1)
            {
                vm.toastr.error("Error");
            }
            else {
                vm.toastr.success(" Success.");
            }
        }
    }
})();