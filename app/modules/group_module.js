// group_module.js
angular.module("group_module", [])
  .directive('drawGroupDirective', ['noteMenu_service', '$document', function(noteMenu_service, $document){
    return {
      restrict: "A",
      link: link
    };

    function link($scope, element, attrs) {
      var initialMouseX, initialMouseY;
      var deltaMouseX, deltaMouseY;
        element.on('mousedown', function(mouse) {
          if(noteMenu_service.getRadioButtonState() === 'drawGroup'){
            // mouse.preventDefault();
            initialMouseX = mouse.clientX;
            initialMouseY = mouse.clientY;
            $document.bind('mousemove', myMouseMove2);
            $document.bind('mouseup', myMouseUp2);
          }
        });

        function myMouseMove2(mouse) {
          //disable pan from other directives when drawGroup is selected
          //check if left mouse button is still down
          //calculate mouse delta
          //TODO:
          //draw / re-draw a new div
            //add group_template.html
          if(mouse.which == 1) {
            deltaMouseX = mouse.clientX - initialMouseX;
            deltaMouseY = mouse.clientY - initialMouseY;
            console.log(deltaMouseX, deltaMouseY);
          } else {
            element.unbind('mousemove', myMouseMove2);
            element.unbind('mouseup', myMouseUp2);
          } 
        };

        var myMouseUp2 = function() {
          $document.unbind('mousemove', myMouseMove2);
          $document.unbind('mouseup', myMouseUp2);
        };
      
    };
  }]);
