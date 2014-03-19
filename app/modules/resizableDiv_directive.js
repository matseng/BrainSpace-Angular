// resizableDiv_directive.js
angular.module("BrainSpace").directive('resizableDivDirective', ['$document', function($document){
  return {
    restrict: 'A',
    link: link
  };
  function link($scope, element, atts){
    var initialElWidth, initialElHeight, initialMouseX, initialMouseY;
    var triangle = angular.element("<div class='triangle'></div");
    element.append(triangle);

    var el = element;  //required to have proper closure below
    triangle.bind('mousedown', function($event, element){
      console.log($event.srcElement);
      initialElWidth = el[0].clientWidth;
      initialElHeight = el[0].clientHeight;
      initialMouseX = $event.clientX;
      initialMouseY = $event.clientY;
      $document.bind('mousemove', resizableMouseDrag);
      $document.bind('mouseup', resizableMouseUp);
    });

    function resizableMouseDrag($event){
      if($event.which === 0){
        $document.unbind('mousemove', resizableMouseDrag);
        $document.unbind('mouseup', resizableMouseUp);
        return;
      }
      var deltaX = $event.clientX - initialMouseX;
      var deltaY = $event.clientY - initialMouseY;
      var width = initialElWidth + deltaX;
      var height = initialElHeight + deltaY;
      var dimensions = {'width': width, 'height': height};
      // $scope.note.dimensions = dimensions;
      el.css(dimensions);
      //$scope.$emit('updateNote', $scope);
      }

    function resizableMouseUp ($event){
      $document.unbind('mousemove', resizableMouseDrag);
      $document.unbind('mouseup', resizableMouseUp);
    }
  }
}]);