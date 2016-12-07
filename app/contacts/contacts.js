'use strict';

angular.module('myContacts.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$http', function($scope, $http) {
    // $('[data-toggle="confirmation"]').confirmation('show');

    $scope.car = {};
    // $scope.confirmedRemove = false;
    $scope.fetchCarsList = function() {
        $http.get("http://localhost:8080/cars/carlist.json").success(function(carList){
            console.log(carList)
            $scope.cars = carList;
        });
    };
    // console.log($scope.contacts);
    $scope.showAddForm = function(){
      $scope.addFormShow = true;
    }
    $scope.hideAddForm = function(){
      $scope.addFormShow = false;
      $scope.editFormShow = false;
    }

    $scope.showEditForm = function(name){
      $scope.editFormShow = true;
      $scope.editedCarName = name;
    }
    // $scope.hideEditForm = function(){
    //   $scope.editFormShow = false;
    // }

    $scope.addNewCar = function(car) {
        console.log(car);
        $http({method  : 'POST',
            url     : 'http://localhost:8080/cars/addCar',
            data    : car, //forms user object
            headers : {'Content-Type': 'application/json'}
        }).success(function() {
            $scope.fetchCarsList();
            $scope.car.name = ''
        }).error(function() {
            // $scope.setError('Could not add a new car');
            console.log("Error posting JSON")
        });
        $scope.addFormShow = false;
    };

    $scope.editCar = function(car) {
        console.log('Removing old car');
        $scope.removeLogic($scope.editedCarName);
        console.log(car);
        $http({method  : 'PUT',
            url     : 'http://localhost:8080/cars/updateCar',
            data    : car, //forms user object
            headers : {'Content-Type': 'application/json'}
        }).success(function() {
            $scope.fetchCarsList();
            $scope.car.name = ''
        }).error(function() {
            // $scope.setError('Could not add a new car');
            console.log("Error posting JSON")
        });
        $scope.editFormShow = false;
    };

    $scope.removeLogic = function(name) {
        $http.delete("http://localhost:8080/cars/removeCar/" + name).success(function (res) {
            console.log(res)
            $scope.fetchCarsList();
        });
    }

    $scope.removeCar = function(name) {
        $('[data-toggle="confirmation"]').confirmation({onConfirm: function() {
            console.log("logging before delete car...")
            $scope.removeLogic(name);
        }});
        $scope.car.name = '';
    };

    $scope.fetchCarsList();
    $scope.predicate = 'id';
}]);