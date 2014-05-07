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
      if(scope.note && scope.note.style)  //check if we have a note, else it's a group
        fontSizeString = scope.note.style['font-size'] || '10pt';
      $rootScope.$broadcast('scope:update', 'headerMenu_service.js');
    };

    this.setScopeByKey = function(key) {
      console.log(notes2, key);
      element = angular.element(document.getElementById(key));
      element.find('textarea')[0].focus();  //sets focus to textarea of the most recently added note
      this.setScope(element.scope(), element);
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
    };
  }
]);
