/*
- draggable.js
- How to use: Add 'draggable' to divs to make them draggable
- adapted from https://gist.github.com/siongui/4969457
*/

angular.module("BrainSpace")
  .directive('draggableDirective', ['$rootScope', '$document', 'navigationService', function($rootScope, $document, navigationService){
    return {
      restrict: 'A',
      link: link
    };
    function link($scope, element, attrs){
      var initialElementX, initialElementY, initialMouseX, initialMouseY;
      $rootScope.mouse = {};

      element.bind('mousedown', function($event){
        var elementClickedClassName = $event.srcElement.className;
        $rootScope.mouse.elementClickedClassName = elementClickedClassName;
        if(elementClickedClassName !== 'selectFontSize' && elementClickedClassName !== 'triangle'){
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

      $document.bind('mousemove', function(mouse){
        if(mouse.which === 0){
          $document.unbind('mousemove', myMouseMove);
          $document.unbind('mouseup', myMouseUp);
        }
      });

      function myMouseMove($event){
        if($rootScope.mouse.elementClickedClassName !== 'triangle'){
          var deltaX = $event.clientX - initialMouseX;
          var deltaY = $event.clientY - initialMouseY;
          var scale = navigationService.getScale();
          var elementX = initialElementX + deltaX * 1/scale;
          var elementY = initialElementY + deltaY * 1/scale;
          var position = {'left': elementX, 'top': elementY};
          $scope.note.position = position;
          element.css(position);
          $scope.$emit('updateNote', $scope);
          // return false;
        }
      }

      function myMouseUp($event){
        $document.unbind('mousemove', myMouseMove);
        $document.unbind('mouseup', myMouseUp);
      }
    }
  }]);
