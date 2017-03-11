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
        var query = {"query": "{car{name}}"}
        $http({method  : 'POST',
            url     : 'http://localhost:8080/graphql',
            data    : query, //forms user object
            headers : {'Content-Type': 'application/json'}
        }).success(function(data) {
            $scope.cars = data.data.car;
        }).error(function() {
            // $scope.setError('Could not add a new car');
            console.log("Error posting JSON")
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

    $scope.showEditForm = function(car){
      $scope.editFormShow = true;
      $scope.editedCarName = car.name;
      $scope.editedCarId = car.id;
    }

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
        car.id = $scope.editedCarId;
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