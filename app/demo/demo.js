(function () {
    'use strict';

    function config ($routeProvider) {
        $routeProvider.when('/demo', {
            templateUrl: 'demo/demo.tpl.html',
            controller: 'DemoCtrl'
        });
    }

    function DemoCtrl () {
    }

    angular.module('myApp.demo', ['ngRoute'])
        .config(config)
        .controller('DemoCtrl', DemoCtrl);
})();