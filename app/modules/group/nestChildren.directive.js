// nestChildren.directive.js

angular.module('group_module')
  .directive('nestChildrenDirective', ['notesFactory', function(notesFactory) { 
    return {
      attribute: "A",
      link: link
    };


    function link($scope, element, attrs, z) {
      var notes = notesFactory.getNotes2();
      var groups = notesFactory.getGroups2();
      noteKeysInGroup = [];
      groupKeysInGroup = [];
      noteInitialPositions = [];
      groupInitialPositions = [];

      element.bind('mousedown', function() {
        // var $scope = event.targetScope;
        var groupRight = $scope.group.style.left + $scope.group.style.width;
        var groupBottom = $scope.group.style.top + $scope.group.style.height;
        angular.forEach(notes, function(note, key) {
          if($scope.group.left <= note.style.left && note.style.left <= groupRight
            && $scope.group.top <= note.style.top && note.style.top <= groupBottom) {
            noteKeysInGroup.push(key);
            noteInitialPositions.push({left: note.style.left, top: note.style.top});
          }
          console.log(noteKeysInGroup);
        });

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
