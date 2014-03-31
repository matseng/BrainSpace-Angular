// navigation_directive.js

angular.module('BrainSpace')
  .directive('navigationDirective', ['$document', 'navigationService', function($document, navigationService){
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

/*
OVERVIEW: 
* 1. Transform mouse movements on page 
*   --> 2. "Transform coordinate system" 
*     --> 3. Global coordinate system
* 
* intialX,Y
* intialMouseX,Y
* deltaX,Y
* finalX,Y
* finalX,Y
*/
      element.bind('mousedown', function(event) {
        if(event.srcElement.id === 'allNotesContainer' || event.srcElement.id === 'allNotesContainerBackground'){
          initialMouseX = event.clientX;
          initialMouseY = event.clientY;
          initialX = navigationService.getTx();
          initialY = navigationService.getTy();
          $document.bind('mousemove', translate)
          $document.bind('mouseup', done)
        }
      });

      function translate(event) {
        if(event.which === 1) {  //ensure left button is down during dragging
          var deltaX = event.clientX - initialMouseX;
          var deltaY = event.clientY - initialMouseY;
          var finalX = initialX + deltaX;
          var finalY = initialY + deltaY;
          navigationService.setTranslate(finalX, finalY);
          var transformString = navigationService.getTransformString();
          allNotesContainer.attr('style', transformString);
        }
      };

      function done() {
        $document.unbind('mousemove', translate)
        $document.unbind('mouseup', done)
      }

      $document.bind('DOMMouseScroll mousewheel wheel', function(mouse){
        mouse.preventDefault();
        if(mouse.deltaY > 0){
          var scale = navigationService.getScale();
          navigationService.setScale(scale * 1.1);
          var transformString = navigationService.getTransformString();
          allNotesContainer.attr('style', transformString);
          console.log("Zoom in, transform: " + transformString);
        }
        else {
          var scale = navigationService.getScale();
          navigationService.setScale(scale * 0.9);
          var transformString = navigationService.getTransformString();
          allNotesContainer.attr('style', transformString);
          console.log("Zoom out, transform: " + transformString);

        } 
      });
    };
  }]);
