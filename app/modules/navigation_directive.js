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
          var containerX = allNotesContainer[0].getBoundingClientRect().left;
          var containerY = allNotesContainer[0].getBoundingClientRect().top;
          $document.bind('mousemove', translate);
          $document.bind('mouseup', done);
          console.log('navigation_directive');
          console.log("  Transform: " + navigationService.getTransformString());
          console.log("  mouse: " + initialMouseX + ", " + initialMouseY);
          console.log("  allNotesContainer: " + containerX + ", " + containerY);
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
        var scaleDelta = .075;
        mouse.preventDefault();
        var scale = navigationService.getScale();

        var screenCenterX = document.body.clientWidth / 2;
        var screenCenterY = document.body.clientHeight / 2;

        var containerRect = allNotesContainer[0].getBoundingClientRect();
        var containerCenterX = containerRect.left + containerRect.width / 2;
        var containerCenterY = containerRect.top + containerRect.height / 2;

        var initialTx = navigationService.getTx();
        var initialTy = navigationService.getTy();
        var deltaX = screenCenterX - containerCenterX;
        var deltaY = screenCenterY - containerCenterY;

        if(mouse.deltaY > 0) {
          navigationService.setScale(scale * 1.075);
          var transformString = navigationService.getTransformString();
          allNotesContainer.attr('style', transformString);
          var finalX = initialTx + initialTx * scaleDelta;
          var finalY = initialTy + initialTy * scaleDelta;
          // navigationService.setTranslate(finalX, finalY);
        }
        else {
          navigationService.setScale(scale * 0.925);
          var transformString = navigationService.getTransformString();
          allNotesContainer.attr('style', transformString);
          var finalX = initialTx - initialTx * scaleDelta;
          var finalY = initialTy - initialTy * scaleDelta;
          // navigationService.setTranslate(finalX, finalY);
        } 
      });
    };
  }]);
