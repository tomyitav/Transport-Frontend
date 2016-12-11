'use strict';

describe('myContacts.trains module', function() {

  beforeEach(module('myContacts.trains'));

  describe('trains controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var scope = {};
      var trainCtrl = $controller('trainCtrl', {
        $scope: scope
      });
      console.log('Hi tests!!!');
      expect("Hello world").toContain("Hello");
    }));

  });
});