// app.js
// cd into directory with index file, then python -m SimpleHTTPServer 3333
// firebase commands: firebase init, firebase deploy  // https://brainspace-biz.firebaseapp.com

var app = angular.module("BrainSpace", ['firebase']);

app.factory('notesFactory', ['$firebase',
  function($firebase){
    var ref = new Firebase('https://brainspace-biz.firebaseio.com/');
    var notesCollection = $firebase(ref);
    return {
      getNotes: function(){
        return notesCollection;
      },
      deleteNote: function(key) {
        notesCollection.$remove(key);
      }
    };
  }
]);

app.controller('menu-controller', ['$rootScope', '$scope', 'notesFactory',
  function($rootScope, $scope, notesFactory){
    $scope.buttonSelected = 'null';
    $scope.menuState = 'explore';
    $rootScope.menuState = $scope.menuState;
    $scope.$watch('menuState', function(newState){
      $rootScope.menuState = newState;
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
        // var menuButtonSelected = $scope.$$prevSibling.buttonSelected;
        if(menuButtonSelected === 'newNote') {
          if (elementClickedId === 'allNotesContainer' || elementClickedId === 'allNotesContainerBackground') {
            
            // var offsetX = mouse.target.getBoundingClientRect().left;
            // var offsetY = mouse.target.getBoundingClientRect().top;
            var tx = navigationService.getTx();
            var ty = navigationService.getTy();
            var x = mouse.pageX;
            var y = mouse.pageY;
            // var y = mouse.offsetY + navigationService.getTy();
            var coordinates = {'position': 'absolute', 'left': x - tx, 'top': y - ty};
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




