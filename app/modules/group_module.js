// group_module.js
angular.module("group_module", [])
  .directive('drawGroupDirective', ['note_menu_service', function(note_menu_service){
    return {
      restrict: "A",
      link: link
    };

    function link($scope, element, attrs) {
      var initialMouseX, initialMouseY;
      var deltaMouseX, deltaMouseY;
        element.on('mousedown', function(mouse) {
          if(note_menu_service.getRadioButtonState() === 'drawGroup'){
            initialMouseX = mouse.clientX;
            initialMouseY = mouse.clientY;
            element.on('mousedrag', myMouseMove);
            element.on('mouseup', myMouseUp);
          }
        });

        var myMouseMove = function(mouse) {
          //disable pan from other directives
          //check is mouse button is still down
          //calculate mouse delta
          //draw / re-draw a new div
          if(mouse.which == 1) {
            deltaMouseX = initialMouseX - mouse.clientX;
            deltaMouseY = initialMouseY - mouse.clientY;
            console.log(deltaMouseX, deltaMouseY);
          } else {
            element.unbind('mousedrag', myMouseMove);
            element.unbind('mouseup', myMouseUp);
          } 
        };

        var myMouseUp = function() {
          element.unbind('mousedrag', myMouseMove);
          element.unbind('mouseup', myMouseUp);
        };
      
    };
  }]);
