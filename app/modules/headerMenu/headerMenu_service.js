// headerMenu_service.js

angular.module('headerMenu_module')
  .service('headerMenu_service', ['$rootScope', 'notesFactory', function($rootScope, notesFactory){
    var scope = {};
    var element;
    var fontSizeString;
    var menuState;
    
    this.setScope = function(myScope, el) {
      scope = myScope;
      element = el;
      fontSizeString = scope.note.style['font-size'];
      $rootScope.$broadcast('scope:update', 'headerMenu_service.js');
    };
    
    this.getScope = function() {
      return scope;
    };

    this.setElement = function(el) {
      element = el;
    };

    this.getElement = function() {
      return element;
    };

    this.getFontSizeString = function() {
      return fontSizeString;
    };

    this.setRadioButtonState = function(state) { 
      menuState = state;
    };

    this.getRadioButtonState = function() {
      return menuState;
    };

    this.setStyle = function(prop, val) {
      scope.note.style[prop] = val;
      notesFactory.updateNote(scope.key);
    }
  }
]);
