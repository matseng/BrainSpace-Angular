// resizableDiv_directive.js
angular.module("note_module").directive('resizableDivDirective', ['$rootScope', '$document', 'navigationService', function($rootScope, $document, navigationService){
  return {
    restrict: 'A',
    link: link
  };

  function link($scope, $element, atts){
    var initialElWidth, initialElHeight, initialMouseX, initialMouseY;
    // var $triangle = angular.element("<div class='triangle'></div>");
    // $element.append($triangle);
    $triangle = angular.element($element[0].getElementsByClassName('triangle')[0]);

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
      if($event.which === 0) {
        $event.preventDefault;
        $document.unbind('mousemove', resizableMouseDrag);
        $document.unbind('mouseup', resizableMouseUp);
        return;
      }
      var deltaX = $event.clientX - initialMouseX;
      var deltaY = $event.clientY - initialMouseY;
      var scale = navigationService.getScale();

      var width = initialElWidth + deltaX * 1/scale;
      var height = initialElHeight + deltaY * 1/scale;
      var dimensions = {'width': width, 'height': height};
      $element.css(dimensions);
      var eventName = 'update:' + $element[0].dataset.type;  //e.g. 'update:note'
      // $scope.$emit(eventName, 'resizableDiv_directive.js', {dimensions: dimensions});
      $rootScope.$broadcast(eventName, 'resizableDiv_directive.js', $scope, {dimensions: dimensions});
      }

    function resizableMouseUp ($event){
      $document.unbind('mousemove', resizableMouseDrag);
      $document.unbind('mouseup', resizableMouseUp);
    }
  }
}]);
