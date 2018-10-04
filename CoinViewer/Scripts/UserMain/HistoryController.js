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
            vm.mainArray = data.Items;
            for (var i = 0; i < vm.mainArray.length; i++) {
                if (vm.mainArray[i].TransactionType == "Buy") {
                    var childNumb = i + 1;
                    $("tbody tr:nth-child(" + childNumb + ")").find('.type').addClass('blue');      
                }
                if (vm.mainArray[i].TransactionType == "Sell") {
                    var childNumb = i + 1;
                    $("tbody tr:nth-child(" + childNumb + ")").find('.type').addClass('green');
                }
            }
        }
        

        function _callFail(error) {
            console.log(error);
        }

    }
})();