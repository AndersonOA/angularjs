angular.module('makersweb', ['makerswebService', 'ngAnimate', 'ngRoute'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider.when('/clientes', {
                templateUrl: 'partials/home.html',
                controller: "ClientesController"
            }).when('/clientes/novo', {
                templateUrl: 'partials/cliente/create.html',
                controller: "ClienteController"
            }).when('/clientes/editar/:clienteId', {
                templateUrl: 'partials/cliente/create.html',
                controller: "ClienteController"
            }).otherwise({redirectTo: '/clientes'});

            // use the HTML5 History API
            $locationProvider.html5Mode(true); //the hashPrefix is for SEO
        });


