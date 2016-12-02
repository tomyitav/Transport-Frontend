'use strict';

angular.module('myContacts.trains', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trains', {
    templateUrl: 'trains/trains.html',
    controller: 'trainCtrl'
  });
}])

.controller('trainCtrl', ['$scope', '$http',function($scope, $http) {
  $scope.train= {};
  $scope.fetchTrainsList = function() {
    $http.get("http://localhost:8080/trains/trainslist.json").success(function(trainList){
      console.log(trainList)
      $scope.trains = trainList;
    });
  };

  $scope.removeTrain = function(id) {
    console.log("logging before delete train...")
    $http.delete("http://localhost:8080/trains/removeTrain/" + id).success(function(res) {
      console.log(res);
      $scope.fetchTrainsList();
    });
    $scope.train.name = '';
  };

  $scope.showAddForm = function(){
    $scope.addFormShow = true;
  }
  $scope.hideAddForm = function(){
    $scope.addFormShow = false;
  }

  $scope.fetchTrainsList();
}]);