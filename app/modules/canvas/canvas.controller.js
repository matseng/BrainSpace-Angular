// canvas.js
// cd into directory with index file, then python -m SimpleHTTPServer 3333
// firebase commands: firebase init, firebase deploy  // https://brainspace-biz.firebaseapp.commands

// var app = angular.module("BrainSpace", ['notes_factory_module', 'note_module', 'headerMenu_module', 'navigation_module', 'group_module']);

angular.module('canvas.module', [])
  //.controller("allNotes_controller", ['$scope', '$firebase', 'notesFactory', 'headerMenu_service', 'refactorData',  //refactorData is used to update previous data structure
  // .controller("allNotes_controller", ['$scope', '$firebase', 'notesFactory', 'headerMenu_service', 'render_service',
  // .controller("allNotes_controller", ['$scope', '$firebase', 'notesFactory', 'headerMenu_service',
  .controller("allNotes_controller", ['$scope', '$firebase', 'notesFactory', 'headerMenu_service', 'data_service',
    function($scope, $firebase, notesFactory, headerMenu_service, data_service) {

      $scope.groups2 = notesFactory.getGroups2();
      $scope.notes2 = notesFactory.getNotes2();
      $scope.noteScopeSelected = null;
      $scope.notes = $scope.notes2;
      $scope.groups = $scope.groups2;
      notesFactory.setScope($scope.notes);
      $scope.notesCollection = notesFactory.getNotes();
      $scope.groupsCollection = notesFactory.getGroups();
      console.log(headerMenu_service);
      console.log(data_service);

      $scope.$on('addNote', function(event, fromFile, note2) {
        // console.log(note2);
        // $scope.notes2.$add(note2);
        // var prom = $scope.notes2.$add(note2);
        var prom = data_service.addNote(note2);
        prom.then(function(ref) {
          // var key = ref.name();
          headerMenu_service.setScopeByKey(ref);
        });
      });

      $scope.$on('update:note', function(event, fromFile, updatedProperty) {
        var noteScope = event.targetScope;
        if (fromFile == 'draggable_directive.js' && updatedProperty) {
          noteScope.set('x', updatedProperty.position.left);
          noteScope.set('y', updatedProperty.position.top);
        } else if (fromFile == 'resizableDiv_directive.js' && updatedProperty) {
          noteScope.set('width', updatedProperty.dimensions.width);
          noteScope.set('height', updatedProperty.dimensions.height);
        }
        data_service.saveKey(noteScope.key);
      });

      $scope.$on('addGroup', function(event, emitterFile, groupObject) {
        // notesFactory.addGroup(groupObject);
        // $scope.groups2.$add(groupObject);
        // console.log(groupObject);
        data_service.addGroup(groupObject);
      });

      $scope.$on('update:group', function(event, fromFile, updatedProperty, deltaObj) {
        var groupScope = event.targetScope;
        var key = Object.keys(updatedProperty)[0];
        if(key == 'position'){
          var position = updatedProperty[key];
          groupScope.group.data.x = position.left;
          groupScope.group.data.y = position.top;
          groupScope.group.style.left = position.left;
          groupScope.group.style.top = position.top;
          delete groupScope.group.left;
          delete groupScope.group.top;
        } else if(key == 'dimensions'){
          groupScope.group.style.width = updatedProperty[key].width;
          groupScope.group.style.height = updatedProperty[key].height;
        }
        // $scope.groups[groupScope.key] = groupScope.group;  //NOTE: This line is a hack to resolve different group objects for same initial group data 
        // $scope.groups.$save(groupScope.key);
        data_service.saveKey(groupScope.key);
        
      });
    }
  ]);
