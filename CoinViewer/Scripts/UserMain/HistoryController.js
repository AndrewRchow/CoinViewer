(function () {
    "use strict";
    angular
        .module('mainApp')
        .controller('HistoryController', HistoryController);
    HistoryController.$inject = ['$scope', '$window', '$genericService'];

    function HistoryController($scope, $window, $genericService) {

        var vm = this;
        vm.$window = $window;
        vm.$onInit = _init;
        vm.$genericService = $genericService;
        vm.mainArray = undefined;


        function _init() {
            vm.$genericService.getAllUserHistory()
                .then(_getAllUserHistorySuccess, _callFail);
        }
        function _getAllUserHistorySuccess(data) {
            console.log(data);
            vm.mainArray = data.Items;
        }
        

        function _callFail(error) {
            console.log(error);
        }

    }
})();