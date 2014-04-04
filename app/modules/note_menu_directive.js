// note_menu_directive.js

angular.module('BrainSpace').directive('noteMenuDirective', ['$rootScope', 'note_menu_service', '$document', function($rootScope, note_menu_service, $document){
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
    // var selectedScope = note_menu_service.getScope();
    // selectedScope.$watch("$id", function(){
    //   console.log(selectedScope.$id);
    // })
    // $document.getElementsByClassName('selectFontSize')[0].value = selectedScope.note.textarea_style.fontSize;​​​​​​​​​​

  }
}]);
