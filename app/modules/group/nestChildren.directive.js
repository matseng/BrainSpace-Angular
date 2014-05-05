// nestChildren.directive.js
// TODO: Working on hierarchical group/note MODEL and VIEW in DOM
  //Model will contain parent and/or child list 
  //On mousedown on a group, create list of child keys
    //Keep track of previous list of child keys
      //Update DOM reflect the notes added and notes removed
  //Create nested view in DOM from group model
  //When a note is dragged, validate it's data.x,y  

angular.module('group_module')
  .directive('nestChildrenDirective', ['notesFactory', '$compile', 'navigationService', 'nest_service',
    function(notesFactory, $compile, navigationService, nest_service) { 
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

        var nestChildInDOM = function(groupKey, childKey) {
          var $groupEl = angular.element(document.getElementById(groupKey));
          var $childEl = angular.element(document.getElementById(childKey));
          var child = $childEl.scope().note;
          child.style.left = child.data.x - $groupEl.scope().group.data.x;
          child.style.top = child.data.y - $groupEl.scope().group.data.y;
          $childEl.attr('ng-style', "{left: note.style.left, top: note.style.top, width: note.style.width, height: note.style.height}");
          $childEl.css({'left': child.style.left, 'top': child.style.top });
          $compile($childEl)($childEl.scope());  //otherwise scope gets lost
          $groupEl.append($childEl);   

        };

        var nestChildrenInDOM = function(noteKeysInGroup) {
          var $childrenNotesContainer;
          var newLeft, newTop; 
          var noteElements;
          var noteId;
          var $allNotesContainer = angular.element(document.getElementById('allNotesContainer'));
          var newlyAddedNoteKeys = {};
          var noteKeysInDOM = {};

          // console.log(Object.keys(noteKeysInGroup).length);
          if(Object.keys(noteKeysInGroup).length > 0) {
            $childrenNotesContainer = angular.element($element[0].getElementsByClassName('childrenNotes')[0]);
            if($childrenNotesContainer.length == 0) {  //ie this container doesn't exist yet
              childrenNotesContainer = "<div class='childrenNotes'></div>";
              $childrenNotesContainer = angular.element(childrenNotesContainer);
              $element.append($childrenNotesContainer);
            }

            noteElements = $childrenNotesContainer[0].getElementsByClassName('noteContainer');
            for(var i = 0; i < noteElements.length; i++) {
              noteId = noteElements[i].id;
              noteKeysInDOM[noteId] = true;
            }

            for(var key in noteKeysInGroup) {
              if(!(key in noteKeysInDOM)) {
                var childEl = document.getElementById(key);
                var $childEl = angular.element(childEl);
                var $childElContainer = angular.element(childEl.parentElement);
                var scope = $childEl.scope();
                // $childEl.attr('style', "");
                scope.note.style.top = scope.note.data.y - $scope.group.data.y;
                scope.note.style.left = scope.note.data.x - $scope.group.data.x;
                $childEl.attr('ng-style', "{left: note.style.left, top: note.style.top, width: note.style.width, height: note.style.height}");
                $childEl.css({'left': scope.note.style.left, 'top': scope.note.style.top });
                // var a = $childElContainer.remove();
                $childrenNotesContainer.append($childElContainer);
              }
            }
          }

        };

        $element.bind('mousedown', function() {
          // noteKeysInGroup = {};
          // var groupRight = $scope.group.data.x + $scope.group.style.width;
          // var groupBottom = $scope.group.data.y + $scope.group.style.height;
          groupInitialX = $scope.group.data.x;
          groupInitialY = $scope.group.data.y;
          // var counter = 0;
          // notesFactory.forEach(notes, function(note, key){
          //   if(note.data && $scope.group.data.x <= note.data.x && note.data.x <= groupRight
          //     && $scope.group.data.y <= note.data.y && note.data.y <= groupBottom) {
          //     noteKeysInGroup[key] = true;
          //   }
          //   counter++;
          // });
          // console.log("Number of notes in group", Object.keys(noteKeysInGroup).length);
          
          // nestChildrenInDOM(noteKeysInGroup);

          // $element.bind('mouseup', myMouseUp);  //SAVE this line
          $scope.group.data.childNotes = nest_service.findChildren($scope.key, nestChildInDOM);
          console.log($scope.group.data.childNotes);
          $element.bind('mouseup', myMouseUp);  //SAVE this line


        });

        function myMouseUp(event) {
          // var scale = navigationService.getScale();
          var key;
          var note;
          var notes = notesFactory.getNotes2();
          // deltaX = $scope.group.data.x - groupInitialX;
          // deltaY = $scope.group.data.y - groupInitialY;
          // console.log(deltaX, deltaY);
          angular.forEach($scope.group.data.childNotes, function(noteKey, index) {
            note = notes[noteKey];
            console.log(note.style.left, note.style.top);
            note.data.x = $scope.group.data.x + note.style.left;
            note.data.y = $scope.group.data.y + note.style.top;
            console.log(note.data.x, note.data.y);
            $scope.notes[noteKey] = note;  //NOTE: This line is a hack to resolve different note objects for the same initial note data 
            // $scope.notes.$save(noteKey);
          });

          // for(var key in noteKeysInGroup) {
          //   note = allNotesScope[key];
          //   // allNotesScope.$save(key);
          // }
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
