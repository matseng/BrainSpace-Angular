// nestChildren.directive.js
// TODO: On mouse up, calculate and $save the notes' global x,y and style left,top

angular.module('group_module')
  .directive('nestChildrenDirective', ['notesFactory', '$compile', function(notesFactory, $compile) { 
    return {
      attribute: "A",
      link: link
    };


    function link($scope, $element, attrs) {
      var notes = notesFactory.getNotes2();
      var groups = notesFactory.getGroups2();
      var noteKeysInGroup;
      var groupKeysInGroup;
      var noteInitialPositions;
      var groupInitialPositions;

      var nestChildrenInDOM = function(noteKeysInGroup) {
        // console.log($element, noteKeysInGroup);
        var $childrenNotesContainer;
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
            console.log($scope.group.data.x, $scope.group.data.y);
            console.log($scope.group.style.left, $scope.group.style.top);
            console.log(scope.note.style.left, scope.note.style.top);
            scope.note.style.left = scope.note.style.left - $scope.group.style.left;  //NOTE: will likely cause errors in the future when data.x,y and style.top,left are fixed
            scope.note.style.top = scope.note.style.top - $scope.group.style.top;
            // scope.note.style.left = 0;
            // scope.note.style.top = 0;
            $childEl.css({'left': scope.note.style.left, 'top': scope.note.style.top })
            $childrenNotesContainer.append($childEl);
            $compile($childEl)(scope);
            console.log($childEl.scope().note.data.text, noteKeysInGroup[i], $element);
          }
        }

      };

      $element.bind('mousedown', function() {
        noteKeysInGroup = [];
        noteInitialPositions = [];
        var groupRight = $scope.group.style.left + $scope.group.style.width;
        var groupBottom = $scope.group.style.top + $scope.group.style.height;
        notesFactory.forEach(notes, function(note, key){
          if(note.style && $scope.group.style.left <= note.style.left && note.style.left <= groupRight
            && $scope.group.style.top <= note.style.top && note.style.top <= groupBottom) {
            noteKeysInGroup.push(key);
            noteInitialPositions.push({left: note.style.left, top: note.style.top});
          }
        });
        
        nestChildrenInDOM(noteKeysInGroup);

        // angular.forEach(notes, function(note, key) {
        //   if($scope.group.left <= note.style.left && note.style.left <= groupRight
        //     && $scope.group.top <= note.style.top && note.style.top <= groupBottom) {
        //     noteKeysInGroup.push(key);
        //     noteInitialPositions.push({left: note.style.left, top: note.style.top});
        //   }
        //   console.log(noteKeysInGroup);
        // });

      });
    };

  }]);


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
