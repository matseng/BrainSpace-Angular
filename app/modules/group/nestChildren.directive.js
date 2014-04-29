// nestChildren.directive.js
// TODO: Working on hierarchical group/note MODEL and VIEW in DOM
  //Model will contain parent and/or child list 
  //On mousedown on a group, create list of child keys
    //Keep track of previous list of child keys
      //Update DOM reflect the notes added and notes removed
  //Create nested view in DOM from group model
  //When a note is dragged, validate it's data.x,y  

angular.module('group_module')
  .directive('nestChildrenDirective', ['notesFactory', '$compile', 'notesFactory', 'navigationService',
    function(notesFactory, $compile, notesFactory, navigationService) { 
      return {
        attribute: "A",
        link: link
      };


      function link($scope, $element, attrs) {
        var notes = notesFactory.getNotes2();
        var groups = notesFactory.getGroups2();
        var noteKeysInGroup;
        var noteKeysInGroupElement;
        var groupKeysInGroup, groupKeysInGroupPrevious;
        var noteInitialPositions;
        var groupInitialPositions;
        var groupInitialX, groupInitialY;
        var deltaX, deltaY;

        var nestChildrenInDOM = function(noteKeysInGroup) {
          var $childrenNotesContainer;
          var newLeft, newTop; 
          var noteElements;
          var noteId;
          // console.log(Object.keys(noteKeysInGroup).length);
          if(Object.keys(noteKeysInGroup).length > 0) {
            $childrenNotesContainer = angular.element($element[0].getElementsByClassName('childrenNotes')[0]);
            if($childrenNotesContainer.length == 0) {  //ie this container doesn't exist yet
              childrenNotesContainer = "<div class='childrenNotes'></div>";
              $childrenNotesContainer = angular.element(childrenNotesContainer);
              $element.append($childrenNotesContainer);
            }

            // noteElements = $childrenNotesContainer[0].getElementsByClassName('noteContainer');
            // for(var i = 0; i < noteElements.length; i++) {
            //   noteId = noteElements[i].id;
            //   // console.log(noteId);
            //   if(noteId in noteKeysInGroup) {
            //     delete noteKeysInGroup[noteId];
            //   }
            // }

            for(var key in noteKeysInGroup) {
              var childEl = document.getElementById(key);
              var $childEl = angular.element(childEl);
              var scope = $childEl.scope();
              $childEl.attr('style', "");
              $childEl.attr('ng-style', "{left: note.style.left, top: note.style.top, width: note.style.width, height: note.style.height}");
              scope.note.style.left = scope.note.data.x - $scope.group.data.x;
              scope.note.style.top = scope.note.data.y - $scope.group.data.y;
              $childEl.css({'left': scope.note.style.left, 'top': scope.note.style.top });
              $childrenNotesContainer.append($childEl);
              $compile($childEl)(scope);  //this line is need, but also need to remove scope from previous $childEl???
            }
          }

        };

        $element.bind('mousedown', function() {
          noteKeysInGroup = {};
          var groupRight = $scope.group.data.x + $scope.group.style.width;
          var groupBottom = $scope.group.data.y + $scope.group.style.height;
          groupInitialX = $scope.group.data.x;
          groupInitialY = $scope.group.data.y;
          var counter = 0;
          notesFactory.forEach(notes, function(note, key){
            if(note.data && $scope.group.data.x <= note.data.x && note.data.x <= groupRight
              && $scope.group.data.y <= note.data.y && note.data.y <= groupBottom) {
              noteKeysInGroup[key] = true;
            }
            counter++;
          });
          console.log("Number of notes in group", Object.keys(noteKeysInGroup).length);
          
          // nestChildrenInDOM(noteKeysInGroup);

          $element.bind('mouseup', myMouseUp);  //SAVE this line

        });

        function myMouseUp(event) {
          var scale = navigationService.getScale();
          var key;
          var note;
          var allNotesScope = notesFactory.getScope();
          deltaX = $scope.group.data.x - groupInitialX;
          deltaY = $scope.group.data.y - groupInitialY;
          console.log(deltaX, deltaY);
          for(var key in noteKeysInGroup) {
            note = allNotesScope[key];
            note.data.x += deltaX;
            note.data.y += deltaY;
            //allNotesScope.$save(key);

          }
          //iterate over notes in group that has been dragged
            //get window coordinates for each note
        $element.unbind('mouseup', myMouseUp);
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
