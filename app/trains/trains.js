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
  $scope.train.diesel = false;
  $scope.fetchTrainsList = function() {
    $http.get("http://localhost:8080/trains/trainslist.json").success(function(trainList){
      console.log(trainList)
      $scope.trains = trainList;
    });
  };

  $scope.removeTrain = function(id) {
    $('[data-toggle="confirmation"]').confirmation({onConfirm: function() {
      console.log("logging before delete train...")
      $http.delete("http://localhost:8080/trains/removeTrain/" + id).success(function (res) {
        console.log(res);
        $scope.fetchTrainsList();
      });
    }});
    $scope.train.name = '';
  };

  $scope.addNewTrain = function(train) {
    console.log(train);
    $http({method  : 'POST',
      url     : 'http://localhost:8080/trains/addTrain',
      data    : train, //forms user object
      headers : {'Content-Type': 'application/json'}
    }).success(function() {
      $scope.fetchTrainsList()
      $scope.train.name = '';
      $scope.train.speed = '';
      $scope.train.diesel = false;
    }).error(function() {
      console.log("Error posting JSON")
    });
    $scope.addFormShow = false;
  };

  $scope.editTrain = function(train) {
    train.id = $scope.editedTrainId;
    console.log(train);
    $http({method  : 'PUT',
      url     : 'http://localhost:8080/trains/updateTrain',
      data    : train, //forms user object
      headers : {'Content-Type': 'application/json'}
    }).success(function() {
      $scope.fetchTrainsList()
      $scope.train.name = ''
    }).error(function() {
      // $scope.setError('Could not add a new car');
      console.log("Error posting JSON")
    });
    $scope.editFormShow = false;
  };

  $scope.showAddForm = function(){
    $scope.addFormShow = true;
  }

  $scope.showEditForm = function(train){
    $scope.editFormShow = true;
    $scope.editedTrainName = train.name;
    $scope.editedTrainSpeed = train.speed;
    $scope.editedTrainDiesel = train.diesel;
    $scope.editedTrainId = train.id;
  }

  $scope.hideAddForm = function(){
    $scope.addFormShow = false;
    $scope.editFormShow = false;
  }
  $scope.sendToSocket= function(){
    console.log('This is before sending to socket...');
    conn.send('Hello Me!');
  }

  $scope.fetchTrainsList();


}]);