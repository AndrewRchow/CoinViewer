(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('NavbarController', NavbarController);
    NavbarController.$inject = ['$scope', '$window'];

    function NavbarController($scope, $window) {

        var vm = this;
        vm.$onInit = _init;
        vm.Invested = 0;
        vm.CurrentCoins = 0;
        vm.Revenue = 0;
        vm.CurrentNet = 0;
      
 

        function _init() {
         
        }
        function _getAllCoinsValueSuccess(data) {
          
        }
        function _getAllCoinsValueFail(error) {
          
        }


       

    }
})();