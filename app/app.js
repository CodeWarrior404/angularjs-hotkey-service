(function () {
    'use strict';

    angular.module('myApp', [
        'ngRoute',
        'myApp.demo'
    ])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/demo'});
    }]);

})();