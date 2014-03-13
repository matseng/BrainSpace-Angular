/* 
- draggable.js
- How to use: Add 'draggable' to divs to make them draggable
- adapted from https://gist.github.com/siongui/4969457
*/

angular.module("BrainSpace")
  .directive('draggable', ['$document', function($document){
    return {
      restrict: 'A',
      link: link
    };
    function link(scope, element, attrs){
      var initialElementX, initialElementY, initialMouseX, initialMouseY;

      element.bind('mousedown', function($event){
        element.css({position: 'absolute'});
        initialElementX = element.prop('offsetLeft');
        initialElementY = element.prop('offsetTop');
        initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;
        $document.bind('mousemove', myMouseMove);
        $document.bind('mouseup', myMouseUp);
        return false;
      });

      function myMouseMove($event){
        var deltaX = $event.clientX - initialMouseX;
        var deltaY = $event.clientY - initialMouseY;
        var elementX = initialElementX + deltaX;
        var elementY = initialElementY + deltaY;
        element.css({'left': elementX, 'top': elementY});
        return false;
      }

      function myMouseUp($event){
        $document.unbind('mousemove', myMouseMove);
        $document.unbind('mouseup', myMouseUp);
      }
    }
  }]);
