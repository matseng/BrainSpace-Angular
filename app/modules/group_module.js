// group_module.js
angular.module("group_module", [])
  .directive('drawGroupDirective', ['note_menu_service', function(note_menu_service){
    return {
      restrict: "A",
      link: link
    };

    function link($scope, element, attrs) {
      //check if draw group radio button is selected from note_menu_service
      //get mouse initial coordinates (see draggable)
      var initialMouseX, initialMouseY;
        element.on('click', function(mouse) {
          if(note_menu_service.getRadioButtonState() === 'drawGroup'){
            initialMouseX = mouse.clientX;
            initialMouseY = mouse.clientY;
            console.log(initialMouseX, initialMouseY);
          }
        });
      
    };
  }]);
