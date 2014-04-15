angular.module('group_module')
  .directive('addGroupDirective', ['headerMenu_service', '$document', 'navigationService', function(headerMenu_service, $document, navigationService){
    return {
      restrict: "A",
      link: link
    };

    function link($scope, element, attrs) {
      var initialMouseX, initialMouseY;
      var deltaMouseX, deltaMouseY;
      var groupObject;
      var $divGroup;
      $document.on('mousedown', function(mouse) {
        if(headerMenu_service.getRadioButtonState() == 'drawGroup' ) {
          // && (mouse.srcElement.id == 'allNotesContainer' 
            // || mouse.srcElement.id == 'allNotesContainerBackground')) {
          mouse.preventDefault();
          groupObject = null;
          initialMouseX = mouse.clientX;
          initialMouseY = mouse.clientY;
          $divGroup = angular.element("<div class='group'> <div>");  //temporary div for visualization only
          $divGroup.css({visibility: 'hidden'});  //TODO: refactor using ng-style?
          element.append($divGroup);
          $document.bind('mousemove', myMouseMove2);
          $document.bind('mouseup', myMouseUp2);
        }
      });

      function myMouseMove2(mouse) {
        if(mouse.which == 1) {
          mouse.preventDefault();
          var containerOffsetX = element[0].getBoundingClientRect().left;  //element points to #allNotesContainer
          var containerOffsetY = element[0].getBoundingClientRect().top;
          var scale = navigationService.getScale();
          deltaMouseX = mouse.clientX - initialMouseX;
          deltaMouseY = mouse.clientY - initialMouseY;
          groupObject = {
            visibility: 'visible',
            left: (initialMouseX - containerOffsetX) * 1/scale, 
            top: (initialMouseY - containerOffsetY) * 1/scale, 
            width: deltaMouseX * 1/scale,
            height: deltaMouseY * 1/scale
          };
          $divGroup.css(groupObject);  //TODO: refactor using ng-style?

        } else {
          element.unbind('mousemove', myMouseMove2);
          element.unbind('mouseup', myMouseUp2);
        } 
      };

      var myMouseUp2 = function() {
        if(groupObject)
          $scope.$emit('addGroup', 'addGroup_directive.js', groupObject);
        // element.remove($divGroup);
        $divGroup.remove();
        $document.unbind('mousemove', myMouseMove2);
        $document.unbind('mouseup', myMouseUp2);
      };
    };
  }]);
