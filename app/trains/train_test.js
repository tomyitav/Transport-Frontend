'use strict';

describe('myContacts.trains module', function() {

  beforeEach(module('myContacts.trains'));

  describe('trains controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var trainCtrl = $controller('trainCtrl');
      console.log('Hi tests!!!');
      expect("Hello world").toContain("Rello");
    }));

  });
});