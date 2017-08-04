(function () {
    'use strict';

    function config ($routeProvider) {
        $routeProvider.when('/demo', {
            templateUrl: 'demo/demo.tpl.html',
            controller: 'DemoCtrl',
            controllerAs: 'demoCtrl'
        });
    }

    function DemoCtrl (hotKeyService, $alert) {
        var vm = this;
        vm.counter = 0;

        hotKeyService.bindKeyCombination('Ctrl+S', function () {
            vm.showInfoAlert('Alert:', 'Invoke Save function');
        });

        hotKeyService.bindKeyCombination('Ctrl+R', function () {
            vm.counter = 0;
            vm.showInfoAlert('Alert:', 'Counter has been reset to 0');
        });

        hotKeyService.bindKeyCombination('I', function () {
            vm.counter++;
        });

        hotKeyService.bindKeyCombination('D', function () {
            vm.counter--;
        });

        vm.showInfoAlert = function(title, message) {
            $alert({title: title, content: message, duration: 3, placement: 'top-right', container: 'body', type: 'info', show: true});
        };
    }

    angular.module('myApp.demo', ['ngRoute'])
        .config(config)
        .controller('DemoCtrl', DemoCtrl);
})();