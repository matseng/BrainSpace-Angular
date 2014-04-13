/*
- draggable_directive.js
- How to use: Add 'draggable' to divs to make them draggable
- adapted from https://gist.github.com/siongui/4969457
*/

angular.module("note_module")
  .directive('draggableDirective', ['$rootScope', '$document', 'navigationService', function($rootScope, $document, navigationService){
    return {
      restrict: 'A',
      link: link
    };
    function link($scope, element, attrs){
      var initialElementX, initialElementY, initialMouseX, initialMouseY;
      $rootScope.mouse = {};
      var elementClickedClassName;

      element.bind('mousedown', function($event){
        $event.preventDefault();
        elementClickedClassName = $event.srcElement.className;
        $rootScope.mouse.elementClickedClassName = elementClickedClassName;
        if(elementClickedClassName !== 'selectFontSize' && elementClickedClassName !== 'triangle'){
          element.css({position: 'absolute'});
          initialElementX = element.prop('offsetLeft');
          initialElementY = element.prop('offsetTop');
          initialMouseX = $event.clientX;
          initialMouseY = $event.clientY;
          $document.bind('mousemove', myMouseMove);
          $document.bind('mouseup', myMouseUp);
          var eventName = 'update:' + element[0].dataset.type + ':mousedown';  //e.g. 'update:group:mousedown'
          $scope.$emit(eventName, 'draggable_directive.js');
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
          $event.preventDefault();
          var deltaX = $event.clientX - initialMouseX;
          var deltaY = $event.clientY - initialMouseY;
          var scale = navigationService.getScale();
          var elementX = initialElementX + deltaX * 1/scale;
          var elementY = initialElementY + deltaY * 1/scale;
          var position = {'left': elementX, 'top': elementY};
          element.css(position);
          var eventName = 'update:' + element[0].dataset.type;  //e.g. 'update:note'
          $scope.$emit(eventName, 'draggable_directive.js', position);
        }
      }

      function myMouseUp($event){
        $document.unbind('mousemove', myMouseMove);
        $document.unbind('mouseup', myMouseUp);
      }
    }
  }]);
