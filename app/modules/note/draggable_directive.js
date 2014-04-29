/*
- draggable_directive.js
- How to use: Add 'draggable' to divs to make them draggable
- adapted from https://gist.github.com/siongui/4969457
*/

angular.module("note_module")
  .directive('draggableDirective', ['$rootScope', '$document', 'navigationService', 'headerMenu_service', function($rootScope, $document, navigationService, headerMenu_service){
    return {
      restrict: 'A',
      link: link
    };
    function link($scope, element, attrs){
      var initialElementX, initialElementY, initialMouseX, initialMouseY;
      $rootScope.mouse = {};
      var elementClickedClassName;

      element.bind('mousedown', function($event){
        if(element[0].dataset.type ==  $event.srcElement.dataset.type 
          || element[0].dataset.type == $event.srcElement.parentElement.dataset.type) { 
          elementClickedClassName = $event.srcElement.className;
          $rootScope.mouse.elementClickedClassName = elementClickedClassName;
          if(elementClickedClassName !== 'triangle' 
            && headerMenu_service.getRadioButtonState() != 'drawGroup') {
            // element.css({position: 'absolute'});
            // element.css({'left': $scope[element[0].dataset.type].style.left, 'top': $scope[element[0].dataset.type].style.top });

            // initialElementX = element.prop('offsetLeft');
            // initialElementY = element.prop('offsetTop');
            initialElementX = $scope[element[0].dataset.type].data.x;
            initialElementY = $scope[element[0].dataset.type].data.y;
            initialMouseX = $event.clientX;
            initialMouseY = $event.clientY;
            $document.bind('mousemove', myMouseMove);
            $document.bind('mouseup', myMouseUp);
            console.log(element[0].dataset.type, 'x:', $scope[element[0].dataset.type].data.x, 'y:', $scope[element[0].dataset.type].data.y);
            console.log(' ', 'left:', $scope[element[0].dataset.type].style.left, 'top:', $scope[element[0].dataset.type].style.top);
            var eventName = 'update:' + element[0].dataset.type + ':mousedown';  //e.g. 'update:group:mousedown'
            // $scope.$emit(eventName, 'draggable_directive.js');
          }
        }
      });

      $document.bind('mousemove', function(mouse){
        if(mouse.which === 0){
          $document.unbind('mousemove', myMouseMove);
          $document.unbind('mouseup', myMouseUp);
        }
      });

      function myMouseMove($event){
        $event.preventDefault();
        if($rootScope.mouse.elementClickedClassName !== 'triangle'){
          var scale = navigationService.getScale();
          var deltaX = $event.clientX - initialMouseX;
          var deltaY = $event.clientY - initialMouseY;
          var elementX = initialElementX + deltaX * 1/scale;
          var elementY = initialElementY + deltaY * 1/scale;
          var position = {'left': elementX, 'top': elementY};
          // element.css(position);
          var eventName = 'update:' + element[0].dataset.type;  //e.g. 'update:note'
          $scope.$emit(eventName, 'draggable_directive.js', {position: position}, {deltaX: deltaX * 1/scale, deltaY: deltaY * 1/scale});
        }
      }

      function myMouseUp($event){
        $document.unbind('mousemove', myMouseMove);
        $document.unbind('mouseup', myMouseUp);
      }
    }
  }]);
