// note_menu_service.js

angular.module('BrainSpace').service('note_menu_service', [function(){
  var scope = {};
  var element;
  var fontSizeString;
  
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
    console.log('note_menu_service, ', fontSizeString);
    return fontSizeString;
  };
}]);
