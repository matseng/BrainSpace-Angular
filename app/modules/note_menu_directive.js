// note_menu_directive.js

angular.module('BrainSpace').directive('noteMenuDirective', ['$rootScope', function($rootScope){
  return {
    restrict: "E",
    link: link
  };

  function link ($scope, element, attrs) {
    element.bind('change', function(){
      if($rootScope.noteSelected){
        var note = $rootScope.noteSelected.note;
        note.title_style = {'fontSize': fontSize};
        noteTitle.setAttribute('style', 'font-size: ' + fontSize);
        $scope.$emit('updateNote', $scope);
      }
    });
  }
}]);