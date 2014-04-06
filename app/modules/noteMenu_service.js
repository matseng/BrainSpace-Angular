// noteMenu_service.js

angular.module('BrainSpace').service('noteMenu_service', [function(){
  var scope = {};
  var element;
  var fontSizeString;
  var menuState;
  
  this.setScope = function(myScope) {
    scope = myScope;
    if(scope.note && scope.note.textarea_style){
      if(scope.note.textarea_style.fontSize)
        fontSizeString = scope.note.textarea_style.fontSize;
    }
  };
  
  this.getScope = function() {
    return scope;
  };

  this.getFontSizeString = function() {
    console.log('noteMenu_service, ', fontSizeString);
    return fontSizeString;
  };

  this.setRadioButtonState = function(state) { 
    menuState = state;
  };

  this.getRadioButtonState = function() {
    return menuState;
  };

}]);
