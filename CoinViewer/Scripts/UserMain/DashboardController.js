(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('DashboardController', DashboardController);
    DashboardController.$inject = ['$scope', '$window'];

    function DashboardController($scope, $window) {

        var vm = this;
        vm.$window = $window;
        vm.$onInit = _init;

        vm.selected = undefined;

        function _init() {
         
        }
       
    }
})();