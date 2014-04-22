// headerMenu_service.js

angular.module('headerMenu_module')
  .service('headerMenu_service', ['$rootScope', 'notesFactory', function($rootScope, notesFactory){
    var scope = {};
    var element;
    var fontSizeString;
    var menuState;
    var notes2 = notesFactory.getNotes2();
    
    this.setScope = function(myScope, el) {
      scope = myScope;
      element = el;
      fontSizeString = scope.note.style['font-size'];
      $rootScope.$broadcast('scope:update', 'headerMenu_service.js');
    };

    this.setScopeByKey = function(key) {
      console.log(notes2, key);
      element = angular.element(document.getElementById(key));
      element.find('textarea')[0].focus();  //sets focus to textarea of the most recently added note
      this.setScope(element.scope());
      // scope = element.scope();
      // console.log(scope.note.style['font-size']);
      // fontSizeString = scope.note.style['font-size'];

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
