(function () {
    'use strict';

    angular.module('myApp', [
        'ngRoute',
        'mgcrea.ngStrap',
        'myApp.demo',
        'services.hotkey'
    ])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/demo'});
    }]);

})();