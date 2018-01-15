(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('userMainController', userMainController);
    userMainController.$inject = ['$scope', '$window', 'userMainService'];

    function userMainController($scope, $window, userMainService) {

        var vm = this;
        vm.$window = $window;
        vm.$onInit = _init;
        vm.userMainService = userMainService;
        vm.selected = undefined;
        vm.send = _send;

        function _init() {
            console.log('hi');
            vm.userMainService.getAllCoinsValue()
                .then(_getAllCoinsValueSuccess, _getAllCoinsValueFail);
        }
        function _getAllCoinsValueSuccess(data) {
            console.log(data.data);
            vm.coinInfo = data.data;
            vm.coinArray = [];
            for (var i = 0; i < vm.coinInfo.length; i++) {
                vm.coinArray.push(vm.coinInfo[i].name + " (" + vm.coinInfo[i].symbol + ")");
            }
            console.log(vm.coinArray);
        }
        function _getAllCoinsValueFail(error) {
            console.log(error);
        }

        function _send() {
            console.log(vm.selected);
        }
    }
})();