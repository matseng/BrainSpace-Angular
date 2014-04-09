// app.js
// cd into directory with index file, then python -m SimpleHTTPServer 3333
// firebase commands: firebase init, firebase deploy  // https://brainspace-biz.firebaseapp.commands

var app = angular.module("BrainSpace", ['notes_factory_module', 'group_module', 'add_note_module']);

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
      console.log('in menu-controller: ', $scope.fontSizeString);
      console.log(typeof $scope.fontSizeString);
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

app.controller("allNotes-controller", ['$scope', '$firebase', 'notesFactory',
  function($scope, $firebase, notesFactory){

    $scope.notes = notesFactory.getNotes();
    notesFactory.setScope($scope.notes);

    $scope.noteScopeSelected = null;

    $scope.$on('noteSelected', function(event, noteScope){
      $scope.noteScopeSelected = noteScope;
    });

    $scope.$on('addNote', function(event, note) {
      $scope.notes.$add(note);
    });

    $scope.$on('updateNote', function(event, noteScope) {
      var key = noteScope.key;
      var value = noteScope.note;
      var obj = {};
      obj[key] = value;
      // $scope.notes.$update(obj);  //NOT WORKING?!
      $scope.notes.$save(key);
    });

    $scope.$on('deleteNote', function(event, key) {
      $scope.notes.$remove(key);
    });

  }
]);

app.controller("note-controller", ['$scope',
  function($scope){
    $scope.fontSize = "12pt";

    $scope.change = function() {
      $scope.$emit('updateNote', $scope);
    };

    // $scope.click = function() {
    //   //TODO: refactor from note_model_directive
    // };
  }
]);

