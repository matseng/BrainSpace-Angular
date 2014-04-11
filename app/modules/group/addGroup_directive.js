angular.module('group_module')
  .directive('addGroupDirective', ['headerMenu_service', '$document', function(headerMenu_service, $document){
    return {
      restrict: "A",
      link: link
    };

    function link($scope, element, attrs) {
      var initialMouseX, initialMouseY;
      var deltaMouseX, deltaMouseY;

      element.on('mousedown', function(mouse) {
        if(headerMenu_service.getRadioButtonState() === 'drawGroup'){
          mouse.preventDefault();
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
        //draw / re-draw a new div by appending it to #allNotesContainer
          //add group_template.html
        if(mouse.which == 1) {
          var $allNotesContainer = angular.element($document[0].querySelector("#allNotesContainer"));
          deltaMouseX = mouse.clientX - initialMouseX;
          deltaMouseY = mouse.clientY - initialMouseY;
          // console.log(deltaMouseX, deltaMouseY);
          var $div = angular.element("<div class='group'> <div>");
          var dimensionStyle = {
            left: initialMouseX, 
            top: initialMouseY, 
            width: deltaMouseX,
            height: deltaMouseY
          };
          var position = "left:" + initialMouseX +"; top:" + initialMouseY;
          var dims = "; width:" + deltaMouseX +"; height:" + deltaMouseY;
          $div.attr('style', position + dims);  //TODO: refactor using ng-style
          $allNotesContainer.append($div);

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
