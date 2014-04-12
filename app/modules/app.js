// app.js
// cd into directory with index file, then python -m SimpleHTTPServer 3333
// firebase commands: firebase init, firebase deploy  // https://brainspace-biz.firebaseapp.commands

var app = angular.module("BrainSpace", ['notes_factory_module', 'note_module', 'headerMenu_module', 'navigation_module', 'group_module']);

app.controller('menu-controller', ['$rootScope', '$scope', 'notesFactory', 'headerMenu_service',
  function($rootScope, $scope, notesFactory, headerMenu_service){
    $scope.buttonSelected = 'null';
    $scope.menuState = 'explore'; //explore, newNote, drawGroup
    $rootScope.menuState = $scope.menuState;

    $scope.$watch('menuState', function(newState){
      $rootScope.menuState = newState;
      headerMenu_service.setRadioButtonState($scope.menuState);
    });
    
    $scope.fontSizeString = "10pt";
    $scope.$on('scope.update', function() {
    // $scope.$on('noteClicked', function() {
      //TODO: DOM view is not updating font size unless an element dragged
      $scope.fontSizeString = headerMenu_service.getFontSizeString();
      // $scope.$apply();  //trying to get DOM to update without needing to drag the element
      // console.log('in menu-controller: ', $scope.fontSizeString);
      // console.log(typeof $scope.fontSizeString);
    });

    $scope.deleteButtonClicked = function(event){
      if($rootScope.noteSelected){
        if(confirm("Confirm delete?")){
          notesFactory.deleteNote($rootScope.noteSelected.scope.key);
        }
      } else {
        console.log("Select a note prior to clicking delete.");
      }
    };
  }
]);

app.controller("allNotes_controller", ['$scope', '$firebase', 'notesFactory',
  function($scope, $firebase, notesFactory){

    $scope.notes = notesFactory.getNotes();
    $scope.groups = notesFactory.getGroups();
    $scope.noteScopeSelected = null;
    notesFactory.setScope($scope.notes);
    $scope.notes2 = notesFactory.getNotes2();

    $scope.$on('noteSelected', function(event, noteScope){
      $scope.noteScopeSelected = noteScope;
    });

    $scope.$on('addNote', function(event, note) {
      console.log(event);
      angular.forEach(event.currentScope.notes, function(val, key) {
        if(key[1] == 'J') {
          $scope.notes2.$add(val);
          console.log(key);
        }
      });
      // $scope.notes.$add(note);

    });

    $scope.$on('update:note', function(event, fromFile, position ) {
      console.log('from: ', fromFile);
      var noteScope = event.targetScope;
      if(position)
        noteScope.note.position = position;
      var key = noteScope.key;
      $scope.notes.$save(key);
    });

    $scope.$on('deleteNote', function(event, key) {
      $scope.notes.$remove(key);
    });

    $scope.$on('addGroup', function(event, groupObject) {
      notesFactory.addGroup(groupObject);
    });

    $scope.$on('update:group', function(event, fromFile, position) {
      console.log(event);
      var groupScope = event.targetScope;
      if(position){
        groupScope.group.left = position.left;
        groupScope.group.top = position.top;
      }
      var key = groupScope.group.key;
      $scope.groups.$save(key);
    });
  }
]);

// app.controller("note-controller", ['$scope',
//   function($scope){
//     $scope.fontSize = "12pt";

//     $scope.change = function() {
//       $scope.$emit('update:note', $scope);
//     };

//     // $scope.click = function() {
//     //   //TODO: refactor from note_model_directive
//     // };
//   }
// ]);

