// nestChildren.directive.js
// TODO: On mouse up, calculate and $save the notes' global x,y and style left,top

angular.module('group_module')
  .directive('nestChildrenDirective', ['notesFactory', '$compile', 'notesFactory', 
    function(notesFactory, $compile, notesFactory) { 
      return {
        attribute: "A",
        link: link
      };


      function link($scope, $element, attrs) {
        var notes = notesFactory.getNotes2();
        var groups = notesFactory.getGroups2();
        var noteKeysInGroup;
        var groupKeysInGroup, groupKeysInGroupPrevious;
        var noteInitialPositions;
        var groupInitialPositions;
        var groupInitialX, groupInitialY;
        var deltaX, deltaY;

        var nestChildrenInDOM = function(noteKeysInGroup) {
          var $childrenNotesContainer;
          var newLeft, newTop;
          if(noteKeysInGroup.length > 0) {
            $childrenNotesContainer = angular.element($element[0].getElementsByClassName('childrenNotes')[0]);
            if($childrenNotesContainer.length == 0){
              childrenNotesContainer = "<div class='childrenNotes'></div>";
              $childrenNotesContainer = angular.element(childrenNotesContainer);
              $element.append($childrenNotesContainer);
            }
            for(var i = 0; i < noteKeysInGroup.length; i++) {
              var childEl = document.getElementById(noteKeysInGroup[i]);
              var $childEl = angular.element(childEl);
              var scope = $childEl.scope();
              scope.note.style.left = scope.note.data.x - $scope.group.data.x;
              scope.note.style.top = scope.note.data.y - $scope.group.data.y;
              $childEl.css({'left': scope.note.style.left, 'top': scope.note.style.top })
              $childrenNotesContainer.append($childEl);
              $compile($childEl)(scope);
            }
          }

        };

        $element.bind('mousedown', function() {
          noteKeysInGroup = [];
          // noteInitialPositions = [];
          var groupRight = $scope.group.data.x + $scope.group.style.width;
          var groupBottom = $scope.group.data.y + $scope.group.style.height;
          groupInitialX = $scope.group.data.x;
          groupInitialY = $scope.group.data.y;
          notesFactory.forEach(notes, function(note, key){
            if(note.data && $scope.group.data.x <= note.data.x && note.data.x <= groupRight
              && $scope.group.data.y <= note.data.y && note.data.y <= groupBottom) {
              noteKeysInGroup.push(key);
              // noteInitialPositions.push({left: note.data.x, top: note.data.y});
            }
          });
          
          nestChildrenInDOM(noteKeysInGroup);

          $element.bind('mouseup', myMouseUp);

        });

        function myMouseUp(event) {
          console.log(event);
          var key;
          var allNotesScope = notesFactory.getScope();
          var note;
          deltaX = $scope.group.data.x - groupInitialX;
          deltaY = $scope.group.data.y - groupInitialY;
          for(var i = 0; i < noteKeysInGroup.length; i++) {
            key = noteKeysInGroup[i];
            note = allNotesScope[key];
            note.data.x += deltaX;
            note.data.y += deltaY;
            // note.style.left += deltaX;
            // note.style.top += deltaY;
            console.log(note);

          }
          //iterate over notes in group that has been dragged
            //get window coordinates for each note
        };

      };  //END link
    }
  ]);


      // $scope.$on('update:group:mousedown', function(event, fromFile) {
      //   noteKeysInGroup = [];
      //   noteInitialPositions = [];
      //   groupKeysInGroup = [];
      //   groupInitialPositions = [];

      //   var groupScope = event.targetScope;
      //   var groupRight = groupScope.group.left + groupScope.group.width;
      //   var groupBottom = groupScope.group.top + groupScope.group.height;
      //   angular.forEach($scope.notes, function(note, key) {
      //     if((note.position) && groupScope.group.left <= note.position.left && note.position.left <= groupRight
      //       && groupScope.group.top <= note.position.top && note.position.top <= groupBottom) {
      //       noteKeysInGroup.push(key);
      //       noteInitialPositions.push({left: note.position.left, top: note.position.top});
      //     }
      //   });
      //   angular.forEach($scope.groups, function(group, key) {
      //     if((group.left) && groupScope.group.left < group.left && group.left < groupRight
      //       && groupScope.group.top < group.top && group.top < groupBottom) {
      //       groupKeysInGroup.push(key);
      //       groupInitialPositions.push({left: group.left, top: group.top});
      //     }
      //   });
      // });
