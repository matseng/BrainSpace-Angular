angular.module('group_module')
  .directive('addGroupDirective', ['headerMenu_service', '$document', 'navigationService', function(headerMenu_service, $document, navigationService){
    return {
      restrict: "A",
      link: link
    };

    function link($scope, element, attrs) {
      var initialMouseX, initialMouseY;
      var deltaMouseX, deltaMouseY;

      $document.on('mousedown', function(mouse) {
        if(headerMenu_service.getRadioButtonState() === 'drawGroup'
          && (mouse.srcElement.id == 'allNotesContainer' 
            || mouse.srcElement.id == 'allNotesContainerBackground')) {
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
          // var $allNotesContainer = angular.element($document[0].querySelector("#allNotesContainer"));
          var containerOffsetX = element[0].getBoundingClientRect().left;  //element points to #allNotesContainer
          var containerOffsetY = element[0].getBoundingClientRect().top;
          var scale = navigationService.getScale();


          deltaMouseX = mouse.clientX - initialMouseX;
          deltaMouseY = mouse.clientY - initialMouseY;
          // console.log(deltaMouseX, deltaMouseY);
          var $div = angular.element("<div draggable_directive class='group'> <div>");
          var groupStyle = {
            left: (initialMouseX - containerOffsetX) * 1/scale, 
            top: (initialMouseY - containerOffsetY) * 1/scale, 
            width: deltaMouseX * 1/scale,
            height: deltaMouseY * 1/scale
          };
          var position = "left:" + groupStyle.left +"; top:" + groupStyle.top;
          var dims = "; width:" + groupStyle.width +"; height:" + groupStyle.height;
          $div.attr('style', position + dims);  //TODO: refactor using ng-style
          // $allNotesContainer.append($div);
          element.append($div);

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
