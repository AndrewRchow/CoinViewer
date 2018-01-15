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
        vm.selected = undefined;

        function _init() {
         
        }
       
    }
})();