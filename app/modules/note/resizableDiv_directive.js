// resizableDiv_directive.js
angular.module("note_module").directive('resizableDivDirective', ['$document', function($document){
  return {
    restrict: 'A',
    link: link
  };

  function link($scope, $element, atts){
    var initialElWidth, initialElHeight, initialMouseX, initialMouseY;
    var $triangle = angular.element("<div class='triangle'></div");
    $element.append($triangle);

    $triangle.bind('mousedown', function($event){
      $event.preventDefault();
      initialElWidth = $element[0].clientWidth;
      initialElHeight = $element[0].clientHeight;
      initialMouseX = $event.clientX;
      initialMouseY = $event.clientY;
      $document.bind('mousemove', resizableMouseDrag);
      $document.bind('mouseup', resizableMouseUp);
    });

    function resizableMouseDrag($event){
      if($event.which === 0){
        $event.preventDefault;
        $document.unbind('mousemove', resizableMouseDrag);
        $document.unbind('mouseup', resizableMouseUp);
        return;
      }
      var deltaX = $event.clientX - initialMouseX;
      var deltaY = $event.clientY - initialMouseY;
      var width = initialElWidth + deltaX;
      var height = initialElHeight + deltaY;
      var dimensions = {'width': width, 'height': height};
      $scope.note.dimensions = dimensions;
      $element.css(dimensions);
      $scope.$emit('updateNote', 'resizableDiv_directive.js', $scope);
      }

    function resizableMouseUp ($event){
      $document.unbind('mousemove', resizableMouseDrag);
      $document.unbind('mouseup', resizableMouseUp);
    }
  }
}]);
