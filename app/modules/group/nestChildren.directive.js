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

        var syncChild = function($childEl) {  //helper function to keep data sync'd prior to future $save's in firebase
          var childScope = $childEl.scope();
          var child;
          if('note' in childScope) {
            child = $childEl.scope().note;
            notes[childScope.key] = child; 
          } else if('group' in childScope) {
            child = $childEl.scope().group;
            groups[childScope.key] = child; 
          }
          return child;
        };

        var togglePosition = function(child, $childEl) {
          var childType = $childEl.attr('data-type');
          var childStyle = $childEl.attr('ng-style');
          if(/data.x/.test($childEl.attr('ng-style'))) {
            $childEl.attr('ng-style', "{left: note.style.left, top: note.style.top, width: note.style.width, height: note.style.height}");
            $childEl.css({'left': child.style.left, 'top': child.style.top });
          } else if(/style.left/.test($childEl.attr('ng-style'))) {
            $childEl.attr('ng-style', "{left: note.data.x, top: note.data.y, width: note.style.width, height: note.style.height}");
            $childEl.css({'left': child.data.x, 'top': child.data.y});
          }
        };

        var nestChildInGroup = function(groupKey, childKey) {
          var $groupEl = angular.element(document.getElementById(groupKey));
          var $childEl = angular.element(document.getElementById(childKey));
          // var child = $childEl.scope().note;
          // notes[childKey] = child;
          var child = syncChild($childEl);
          child.style.left = child.data.x - $groupEl.scope().group.data.x;
          child.style.top = child.data.y - $groupEl.scope().group.data.y;
          // $childEl.attr('ng-style', "{left: note.style.left, top: note.style.top, width: note.style.width, height: note.style.height}");
          // $childEl.css({'left': child.style.left, 'top': child.style.top });
          togglePosition(child, $childEl);
          $compile($childEl)($childEl.scope());  //otherwise scope gets lost
          $groupEl.append($childEl);
        };

        var removeChildFromGroup = function(groupKey, childKey) {
          var $allNotesContainer = angular.element(document.getElementById('allNotesContainer'));
          var $groupEl = angular.element(document.getElementById(groupKey));
          var $childEl = angular.element(document.getElementById(childKey));
          var group = $groupEl.scope().group;
          // var child = $childEl.scope().note;
          // notes[childKey] = child;
          var child = syncChild($childEl);
          child.data.x = group.data.x + child.style.left;
          child.data.y = group.data.y + child.style.top;
          // $childEl.attr('ng-style', "{left: note.data.x, top: note.data.y, width: note.style.width, height: note.style.height}");
          // $childEl.css({'left': child.data.x, 'top': child.data.y});
          togglePosition(child, $childEl);
          $compile($childEl)($childEl.scope());  //otherwise scope gets lost
          $allNotesContainer.append($childEl);
        };

        $element.bind('mousedown', function() {
          $scope.group.data.childNotes = nest_service.findChildren($scope.key, notes, nestChildInGroup);
          console.log($scope.group.data.childNotes);
          $element.bind('mouseup', myMouseUp);  //SAVE this line
        });

        function myMouseUp(event) {
          angular.forEach($scope.group.data.childNotes, function(noteKey, index) {
            removeChildFromGroup($scope.key, noteKey);
            // var note = notes[noteKey];
            // $scope.notes[noteKey] = note;  //NOTE: This line is a hack to resolve different note objects for the same initial note data 
            $scope.notes.$save(noteKey);
          });
        $element.unbind('mouseup', myMouseUp);
        };

      };  //END link
    }
  ]);
