'use strict';

describe('myContacts.trains module', function() {

  beforeEach(module('myContacts.trains'));

  describe('trains controller', function(){

    it('should test train controller', inject(function($controller, $rootScope) {
      //spec body
      var scope = $rootScope.$new();
      scope.addFormShow = false;
      var trainCtrl = $controller('trainCtrl', {
        $scope: scope
      });
      console.log('Hi tests!!!');
      expect("Hello world").toContain("Hello");
      expect(scope.addFormShow).toBeDefined();
      expect(scope.addFormShow).toEqual(false);
      //executing modifing function
      scope.showAddForm();
      expect(scope.addFormShow).toEqual(true);
    }));

    it('should test train controller after first', inject(function($controller, $rootScope) {
      //spec body
      var scope = $rootScope.$new();
      scope.editFormShow = false;
      var trainCtrl = $controller('trainCtrl', {
        $scope: scope
      });
      console.log('Hi test number 2!!!');
      expect(scope.editFormShow).toBeDefined();
      expect(scope.editFormShow).toEqual(false);
      var trainForTest = {"name" : 'train',
      "speed":100, "diesel" : true}
      //executing modifing function
      scope.showEditForm(trainForTest);
      expect(scope.editFormShow).toEqual(true);
    }));

  });
});