// navigation_directive.js

angular.module('BrainSpace')
  .directive('navigationDirective', ['$document', 'navigationService', 'notesFactory', function($document, navigationService, notesFactory){
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
          event.preventDefault();
          initialMouseX = event.clientX;
          initialMouseY = event.clientY;
          initialX = navigationService.getTx();
          initialY = navigationService.getTy();
          var containerX = allNotesContainer[0].getBoundingClientRect().left;
          var containerY = allNotesContainer[0].getBoundingClientRect().top;
          $document.bind('mousemove', translate);
          $document.bind('mouseup', done);
        }
      });

      function translate(event) {
        if(event.which === 1) {  //ensure left button is down during dragging
          event.preventDefault();
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
        var allNotesScope = notesFactory.getNotes();
        var scale = navigationService.getScale();
        var mouseX = mouse.clientX;
        var mouseY = mouse.clientY;
        var screenCenterX = document.body.clientWidth / 2;
        var screenCenterY = document.body.clientHeight / 2;
        var tx = navigationService.getTx();
        var ty = navigationService.getTy();
        var mouseDistFromCenterX = mouseX - screenCenterX;
        var mouseDistFromCenterY = mouseY - screenCenterY;
        var deltaX = mouseDistFromCenterX - tx;
        var deltaY = mouseDistFromCenterY - ty;
        var deltaAbsX = deltaX / scale;
        var deltaAbsY = deltaY / scale;

        var newScale;
        if(mouse.deltaY > 0) {
          newScale = scale * 1.1;
        }
        else {
          newScale = scale * 0.9;
        } 
        
        navigationService.setScale(newScale);
        var newDeltaAbsX = deltaAbsX * newScale;
        var newDeltaAbsY = deltaAbsY * newScale;
        navigationService.setTranslate(-newDeltaAbsX + mouseDistFromCenterX, -newDeltaAbsY + mouseDistFromCenterY);
        var transformString = navigationService.getTransformString();
        allNotesContainer.attr('style', transformString);
      });
    };
  }]);
