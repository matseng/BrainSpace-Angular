// note_menu_directive.js

angular.module('headerMenu_module')
  .directive('noteMenuDirective', ['$rootScope', 'headerMenu_service', '$document', function($rootScope, headerMenu_service, $document){
    return {
      restrict: "E",
      link: link
    };

    function link ($scope, element, attrs) {
      // element.bind('change', function(){
      //   var selectedScope = headerMenu_service.getScope();
      //   if(selectedScope){
      //     var fontSize = event.srcElement.value;
      //     var noteScope = $rootScope.noteSelected.scope;
      //     var textareaElement = $rootScope.noteSelected.element.find('textarea');
      //     noteScope.note.textarea_style = {'fontSize': fontSize};
      //     textareaElement.attr('style', 'font-size: ' + fontSize);
      //     // $scope.$emit('update:note', $scope);  //message NOT recieved by child scope
      //   }
      // });
    }
  }
]);
