/* 
- draggable.js
- How to use: Add 'draggable' to divs to make them draggable
- adapted from https://gist.github.com/siongui/4969457
*/

angular.module("BrainSpace")
  .directive('draggableDirective', ['$document', function($document){
    return {
      restrict: 'A',
      link: link
    };
    function link($scope, element, attrs){
      var initialElementX, initialElementY, initialMouseX, initialMouseY;
      element.bind('mousedown', function($event){
        var elementClickedClassName = $event.srcElement.className;
        if(elementClickedClassName !== 'selectFontSize'){
          element.css({position: 'absolute'});
          initialElementX = element.prop('offsetLeft');
          initialElementY = element.prop('offsetTop');
          initialMouseX = $event.clientX;
          initialMouseY = $event.clientY;
          $document.bind('mousemove', myMouseMove);
          $document.bind('mouseup', myMouseUp);
          return false;
        }
      });

      $document.bind('mouseup', function(){
        $document.unbind('mousemove', myMouseMove);
        $document.unbind('mouseup', myMouseUp);
      })

      function myMouseMove($event){
        var deltaX = $event.clientX - initialMouseX;
        var deltaY = $event.clientY - initialMouseY;
        var elementX = initialElementX + deltaX;
        var elementY = initialElementY + deltaY;
        var position = {'left': elementX, 'top': elementY};
        $scope.note.position = position;
        element.css(position);
        $scope.$emit('updateNote', $scope); 

        return false;
      }

      function myMouseUp($event){
        $document.unbind('mousemove', myMouseMove);
        $document.unbind('mouseup', myMouseUp);
      }
    }
  }]);
