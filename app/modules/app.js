// app.js
// cd into directory with index file, then python -m SimpleHTTPServer 3333
// firebase commands: firebase init, firebase deploy  // https://brainspace-biz.firebaseapp.commands

var app = angular.module("BrainSpace", ['notes_factory_module', 'note_module', 'headerMenu_module', 'navigation_module', 'group_module']);

app.controller("allNotes_controller", ['$scope', '$firebase', 'notesFactory', 'headerMenu_service',
  function($scope, $firebase, notesFactory, headerMenu_service){

    $scope.groups2 = notesFactory.getGroups2();
    $scope.notes2 = notesFactory.getNotes2();
    $scope.noteScopeSelected = null;
    $scope.notes = $scope.notes2;
    $scope.groups = $scope.groups2;
    notesFactory.setScope($scope.notes);

    $scope.groups.$on('loaded', function(data) {
      // var keys = $scope.groups.$getIndex();
      // console.log("count: " + keys.length);
      // for(var i = 0; i < keys.length; i++) {
      //   console.log($scope.groups[keys[i]]);
      // }
      // var keys = data.$getIndex();
      // console.log("count: " + keys.length);
      // for(var i = 0; i < keys.length; i++) {
      //   console.log(data[keys[i]]);
      // }
    });

    $scope.click = function($event) {
      // console.log($event);
      var element = angular.element($event.srcElement);
      var localScope = element.scope();
      headerMenu_service.setScope(localScope, element);
    };

    $scope.$on('noteSelected', function(event, noteScope){
      $scope.noteScopeSelected = noteScope;
    });

    $scope.$on('addNote', function(event, note) {
      $scope.notes.$add(note);
    });

    $scope.$on('update:note', function(event, fromFile, updatedProperty) {
      var noteScope = event.targetScope;
      if(fromFile == 'draggable_directive.js' && updatedProperty) {
        // console.log(updatedProperty);
        noteScope.note.data.x = updatedProperty.position.left;
        noteScope.note.data.y = updatedProperty.position.top;
        noteScope.note.style.left = updatedProperty.position.left;
        noteScope.note.style.top = updatedProperty.position.top;
      }
      $scope.notes.$save(noteScope.key);
    });

    $scope.$on('addGroup', function(event, emitterFile, groupObject) {
      notesFactory.addGroup(groupObject);
    });

    var noteKeysInGroup = [];  //TODO: refactor into a service
    var noteInitialPositions = [];
    var groupKeysInGroup = [];
    var groupInitialPositions = [];

    $scope.$on('update:group:mousedown', function(event, fromFile) {
      noteKeysInGroup = [];
      noteInitialPositions = [];
      groupKeysInGroup = [];
      groupInitialPositions = [];

      var groupScope = event.targetScope;
      var groupRight = groupScope.group.left + groupScope.group.width;
      var groupBottom = groupScope.group.top + groupScope.group.height;
      angular.forEach($scope.notes, function(note, key) {
        if((note.position) && groupScope.group.left <= note.position.left && note.position.left <= groupRight
          && groupScope.group.top <= note.position.top && note.position.top <= groupBottom) {
          noteKeysInGroup.push(key);
          noteInitialPositions.push({left: note.position.left, top: note.position.top});
        }
      });
      angular.forEach($scope.groups, function(group, key) {
        if((group.left) && groupScope.group.left < group.left && group.left < groupRight
          && groupScope.group.top < group.top && group.top < groupBottom) {
          groupKeysInGroup.push(key);
          groupInitialPositions.push({left: group.left, top: group.top});
        }
      });
    });

    $scope.$on('update:group', function(event, fromFile, updatedProperty, deltaObj) {
      var groupScope = event.targetScope;
      var key = Object.keys(updatedProperty)[0];
      if(key == 'position'){
        var position = updatedProperty[key];
        var groupRight = position.left + groupScope.group.width;
        var groupBottom = position.top + groupScope.group.height;
        for(var i = 0; i < noteKeysInGroup.length; i++) {
          note = $scope.notes[noteKeysInGroup[i]];
          note.position.left = noteInitialPositions[i].left + deltaObj.deltaX;
          note.position.top = noteInitialPositions[i].top + deltaObj.deltaY;
        }
        for(var i = 0; i < groupKeysInGroup.length; i++) {
          group = $scope.groups[groupKeysInGroup[i]];
          group.left = groupInitialPositions[i].left + deltaObj.deltaX;
          group.top = groupInitialPositions[i].top + deltaObj.deltaY;
        }
        groupScope.group.left = position.left;
        groupScope.group.top = position.top;
      } else if(key == 'dimensions'){
        groupScope.group.width = updatedProperty[key].width;
        groupScope.group.height = updatedProperty[key].height;
      }
      for(var i = 0; i < noteKeysInGroup.length; i++) {
        $scope.notes.$save(noteKeysInGroup[i]);
      }
      for(var i = 0; i < groupKeysInGroup.length; i++) {
        $scope.groups.$save(groupKeysInGroup[i]);
      }
      $scope.groups.$save(groupScope.group.key);
    });
  }
]);
