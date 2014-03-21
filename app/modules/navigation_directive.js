// navigation_directive.js

angular.module('BrainSpace').directive('navigationDirective', ['$document', function($document){
  return {
    restrict: 'A',
    link: link
  };

  function link($scope, element, attrs) {
    var initialX, initialY, initialMouseX, initialMouseY, deltaX, deltaY;
    var finalX, finalY;
    var offsetX, offsetY;
    var scale = 1;
    var allNotesContainer = element.children();

    element.bind('mousedown', function(event) {
      if(event.srcElement.id === 'allNotesContainer' || event.srcElement.id === 'allNotesContainerBackground'){
        //  console.log($scope, element, attrs, event);
        // console.log(element);
        initialMouseX = event.clientX;
        initialMouseY = event.clientY;
        initialX = allNotesContainer[0].getBoundingClientRect().left;
        initialY = allNotesContainer[0].getBoundingClientRect().top;
        if(!offsetX)
          offsetX = initialX;
        if(!offsetY)
          offsetY = initialY;
        initialDeltaX = initialX - initialMouseX;
        initialDeltaY = initialY - initialMouseY;
        $document.bind('mousemove', translate)
        $document.bind('mouseup', done)
      }
    });

    function translate(event) {
      var deltaX = event.clientX - initialMouseX;
      var deltaY = event.clientY - initialMouseY;
      var finalX = initialX - offsetX + deltaX;
      var finalY = initialY -offsetY + deltaY;
      // finalDeltaX = initialX - event.clientX;
      // finalDeltaY = initialY - event.clientY;
      // deltaDeltaX = - finalDeltaX + initialDeltaX;
      // deltaDeltaY = - finalDeltaY + initialDeltaY;
      // finalDeltaX = event.clientX - initialY;
      // console.log(deltaX, deltaY);
      var trans = "-webkit-transform: matrix(" + scale + ", 0, 0, " + scale + ", " + finalX + ', ' + finalY +')';
      //var trans = "-webkit-transform: matrix(" + scale + ", 0, 0, " + scale + ", " + deltaDeltaX + ', ' + deltaDeltaY +')';
      allNotesContainer.attr('style', trans);
    };

    function done() {
      $document.unbind('mousemove', translate)
      $document.unbind('mouseup', done)
    }
  };
}]);