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

      element.bind('mousedown', function(event) {
        if(event.srcElement.id === 'allNotesContainer' || event.srcElement.id === 'allNotesContainerBackground'){
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
        var finalY = initialY - offsetY + deltaY;
        navigationService.setScale(scale);
        console.log(finalX, finalY);
        navigationService.setTranslate(finalX, finalY);
        var trans = "-webkit-transform: matrix(" + scale + ", 0, 0, " + scale + ", " + finalX + ', ' + finalY +')';
        allNotesContainer.attr('style', trans);
      };

      function done() {
        $document.unbind('mousemove', translate)
        $document.unbind('mouseup', done)
      }
    };
  }]);
