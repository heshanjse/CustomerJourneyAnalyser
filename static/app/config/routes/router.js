/**
 * Created by Ravan on 2/25/2017.
 */
angular.module('autosuport.config', [])
    .config(['$routeProvider','$locationProvider', routes]);


function routes($routeProvider,$locationProvider) {


    $routeProvider
        .when('/', {
            templateUrl: 'static/home/home.html',
            controller: 'HomeController',
            controllerAs: 'AS'

        }).when('/customerLoyality', {
            templateUrl: 'static/customerLoyality/membership.html',
            controller: 'HomeController',
            controllerAs: 'AS'

        }).when('/painpoint', {
            templateUrl: 'static/painPointAnalysis/painpointanalysis.html',
            controller: 'painpointController',
            controllerAs: 'AS'

        })
        .otherwise('/');
  $locationProvider.html5Mode(true);

}

