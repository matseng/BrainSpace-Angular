// app.js
// cd into directory with index file, then python -m SimpleHTTPServer 3333
// firebase commands: firebase init, firebase deploy  // https://brainspace-biz.firebaseapp.commands

var app = angular.module("BrainSpace", ['notes_factory_module', 'note_module', 'headerMenu_module', 'navigation_module', 'group_module']);

app.controller("allNotes_controller", ['$scope', '$firebase', 'notesFactory', 'headerMenu_service',
  function($scope, $firebase, notesFactory, headerMenu_service){

    $scope.notes = notesFactory.getNotes();
    $scope.groups = notesFactory.getGroups();
    $scope.noteScopeSelected = null;
    notesFactory.setScope($scope.notes);

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
      var propertyName = Object.keys(updatedProperty)[0];
      noteScope.note[propertyName] = updatedProperty[propertyName];
      $scope.notes.$save(noteScope.key);
    });

    $scope.$on('addGroup', function(event, groupObject) {
      notesFactory.addGroup(groupObject);
    });

    var noteKeysInGroup = [];  //TODO: refactor into a service
    var noteInitialPositions = [];

    $scope.$on('update:group:mousedown', function(event, fromFile) {
      noteKeysInGroup = [];
      noteInitialPositions = [];
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
        groupScope.group.left = position.left;
        groupScope.group.top = position.top;
      } else if(key == 'dimensions'){
        groupScope.group.width = updatedProperty[key].width;
        groupScope.group.height = updatedProperty[key].height;
      }
      var key = groupScope.group.key;
      $scope.groups.$save(key);
      for(var i = 0; i < noteKeysInGroup.length; i++) {
        $scope.notes.$save(noteKeysInGroup[i]);
      }
    });
  }
]);
