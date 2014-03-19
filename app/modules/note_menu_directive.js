// note_menu_directive.js

angular.module('BrainSpace').directive('noteMenuDirective', ['$rootScope', function($rootScope){
  return {
    restrict: "E",
    link: link
  };

  function link ($scope, element, attrs) {
    element.bind('change', function(){
      if($rootScope.noteSelected){
        var fontSize = event.srcElement.value;
        var noteScope = $rootScope.noteSelected.scope;
        var textareaElement = $rootScope.noteSelected.element.find('textarea');
        noteScope.note.textarea_style = {'fontSize': fontSize};
        textareaElement.attr('style', 'font-size: ' + fontSize);
        // $scope.$emit('updateNote', $scope);  //message NOT recieved by child scope
      }
    });
  }
}]);