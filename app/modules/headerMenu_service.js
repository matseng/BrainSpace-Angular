// headerMenu_service.js

angular.module('BrainSpace').service('headerMenu_service', ['$rootScope', function($rootScope){
  var scope = {};
  var element;
  var fontSizeString;
  var menuState;
  
  this.setScope = function(myScope, el) {
    scope = myScope;
    element = el;
    if(scope.note && scope.note.textarea_style){
      if(scope.note.textarea_style.fontSize)
        fontSizeString = scope.note.textarea_style.fontSize;
    }
    $rootScope.$broadcast('scope.update');
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
    console.log('headerMenu_service, ', fontSizeString);
    return fontSizeString;
  };

  this.setRadioButtonState = function(state) { 
    menuState = state;
  };

  this.getRadioButtonState = function() {
    return menuState;
  };

}]);
