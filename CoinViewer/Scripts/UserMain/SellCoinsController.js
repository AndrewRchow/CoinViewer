(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('SellCoinsController', SellCoinsController);
    SellCoinsController.$inject = ['$scope', '$window', 'toastr'];

    function SellCoinsController($scope, $window, toastr) {

        var vm = this;
        vm.$window = $window;
        vm.selected = undefined;
        vm.$onInit = _init;
        vm.coinArray = [];
        vm.currentPrice = undefined;
       
        vm.toastr = toastr;
        //vm.test = _test;

        function _init() {

        }

       
        
    }
})();