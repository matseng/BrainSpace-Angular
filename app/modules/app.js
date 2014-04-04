// app.js
// cd into directory with index file, then python -m SimpleHTTPServer 3333
// firebase commands: firebase init, firebase deploy  // https://brainspace-biz.firebaseapp.commands

var app = angular.module("BrainSpace", ['notes_factory_module', 'group_module']);

app.controller('menu-controller', ['$rootScope', '$scope', 'notesFactory', 'note_menu_service',
  function($rootScope, $scope, notesFactory, note_menu_service){
    $scope.buttonSelected = 'null';
    $scope.menuState = 'explore';
    $rootScope.menuState = $scope.menuState;

    $scope.$watch('menuState', function(newState){
      $rootScope.menuState = newState;
      note_menu_service.setRadioButtonState($scope.menuState);
    });
    
    $scope.fontSizeString = "12pt";
    $scope.$on('noteClicked', function(a) {
      //TODO: DOM view is not updating font size unless an element dragged
      $scope.fontSizeString = note_menu_service.getFontSizeString();
      // $scope.$apply();
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
    $scope.submitButtonClicked = function(){
      if(! $scope.note){
        $scope.note = {};
        $scope.note.title = 'no title yet';
        $scope.note.body = 'no text yet';
      }
      var note = {
        title: $scope.note.title,
        body: $scope.note.body
      };
      $scope.$emit('addNote', note);
    };

    $scope.deleteButtonClicked = function(){
      if(confirm("Confirm delete?")){
        var elClicked = event.srcElement;
        var noteContainer = elClicked.parentNode.parentNode;
        var detached = noteContainer.remove();
        $scope.$emit('deleteNote', $scope.key);
      }
    };

    $scope.updateButtonClicked = function(){
      $scope.$emit('updateNote', $scope); 
    };
  }
]);

/*
- Listens for mouse click to add new notes at a specific position
- This directive is added to #allNotesContainer element
*/
app.directive('addNoteDirective', ['$document', '$compile', '$rootScope', 'navigationService',
  function($document, $compile, $rootScope, navigationService){
    return {
      restrict: 'A',
      link: link
    };
    function link($scope, element, attrs){
      $document.on('click', function(mouse){
        var elementClickedId = mouse.srcElement.id;
        var menuButtonSelected = $rootScope.menuState;
        if(menuButtonSelected === 'newNote') {
          if (elementClickedId === 'allNotesContainer' || elementClickedId === 'allNotesContainerBackground') {
            var scale = navigationService.getScale();
            var containerX = element[0].getBoundingClientRect().left;
            var containerY = element[0].getBoundingClientRect().top;
            var x = mouse.clientX;
            var y = mouse.clientY;
            var deltaAbsX = (x - containerX) * 1/scale; 
            var deltaAbsY = (y - containerY) * 1/scale; 
            var coordinates = {'position': 'absolute', 'left': deltaAbsX, 'top': deltaAbsY};
            var note = {
              title: 'Title',
              body: 'Details...',
              position: coordinates
            };
            $scope.$emit('addNote', note);
          
          // angular.element('.textContent').focus();
          // angular.element(('.textContent').on('focusout', function(){
          //   $(this).attr('disabled', true);  //textarea is no longer editable - user will need to click edit
          //   console.log('Will "autosave" in the future');
          // }));
          }
        }
      })
    }
  }
]);




