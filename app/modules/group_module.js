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
        element.on('click', function() {
          if(note_menu_service.getRadioButtonState() === 'drawGroup'){
            console.log(note_menu_service.getRadioButtonState());
          }
        });
      
    };
  }]);
