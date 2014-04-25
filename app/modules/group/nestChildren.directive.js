// nestChildren.directive.js

angular.module('group_module')
  .directive('nestChildrenDirective', ['notesFactory', function(notesFactory) { 
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
        if(noteKeysInGroup.length > 0) {
          var $childrenNotes = angular.element("<div class='childrenNotes'></div>");
          for(var i = 0; i < noteKeysInGroup.length; i++) {
            var el = document.getElementById(noteKeysInGroup[i]);
            var $el = angular.element(el);
            console.log($el.scope().note.data.text, noteKeysInGroup[i]);
            $childrenNotes.append($el);
          }
        }
        $element.append($childrenNotes);

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
        
        //nestChildrenInDOM(noteKeysInGroup);

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
