'use strict';

angular.module('myContacts.trains', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trains', {
    templateUrl: 'trains/trains.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);