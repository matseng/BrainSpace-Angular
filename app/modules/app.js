//app.js

var app = angular.module("BrainSpace", ['firebase']);

app.factory('notesFactory', ['$firebase', 
  function($firebase){
    var ref = new Firebase('https://brainspace-biz.firebaseio.com/');
    var notesCollection = $firebase(ref);
    return {
      getNotes: function(){
        return notesCollection;
      },
      addNote: function(noteObj){
        notesCollection.$add(noteObj, function(err){
          if(err)
            console.log("Error saving note object to Firebase: " + err);
          else
            console.log("Note object successfully saved to Firebase");
        });
      }
    }
  }
]);

app.controller("app-controller", ['$scope', 'notesFactory', 
  function($scope, notesFactory){
    $scope.notes = notesFactory.getNotes();  //2-way data bind good for async firebase requests
    console.log($scope.notes);
  }
]);

// app.controller("noteSubmit-controller", ['$scope', 'notesFactory',
//   function($scope, notesFactory){
//     $scope.note = {username: "anonymous"};
//     $scope.create = function(){
//       var note = {
//         title: $scope.note.title, 
//         username: $scope.note.username
//       };
//     notesFactory.addNote(note);
//     }

//   }
// ]);

app.controller("noteContainer-controller", ['$scope', 'notesFactory',
  function($scope, notesFactory){
    // $scope.spice = "Hola Jalepenos";
    // $scope.note;
    $scope.create = function(){
      if(! $scope.note){
        $scope.note = {};
        $scope.note.title = 'no title yet';
        $scope.note.body = 'no text yet';
      }
      var note = {
        title: $scope.note.title,
        body: $scope.note.body
      }
      notesFactory.addNote(note);
    };
    $scope.deleteButtonClicked = function(){
      if(confirm("Confirm delete?")){
        var elClicked = event.srcElement;
        var noteContainer = elClicked.parentNode.parentNode;
        var detached = noteContainer.remove();
      }
    };
    $scope.copyButtonClicked = function(){
      alert('Copy button clicked');
    };
  }
]);

/*
- Listens for mouse click to add new notes at a specific position
- This directive is added to #allNotesContainer element
*/
app.directive('addNoteListener', ['$document', 
  function($document){
    return {
      restrict: 'A',
      link: link
    };
    function link(scope, element, attrs){
      

      element.on('click', function(mouse){
        var elementClickedId = mouse.srcElement.id;
        //SAVE:
        // var menuButtonCheckedId = angular.element("#menuContainer .btn-group :checked").attr('id');
        // if( elementClickedId === 'allNotesContainer' && menuButtonCheckedId === 'newNote') {
        if( elementClickedId === 'allNotesContainer'){
          var x = mouse.offsetX;
          var y = mouse.offsetY;
          var noteContainer = angular.element(document.getElementById('noteTemplate').content.cloneNode(true).children[0]);
          element.append(noteContainer);
          noteContainer.css({'position': 'absolute', 'left': x, 'top': y}); //NOTE: Can only modify certain CSS after the element is appended to the DOM
          // angular.element('.textContent').focus();
          // angular.element(('.textContent').on('focusout', function(){
          //   $(this).attr('disabled', true);  //textarea is no longer editable - user will need to click edit
          //   console.log('Will "autosave" in the future');
          // }));
        }
      })
    }
  }
]);

/*
- Listens for mouse click to add new notes at a specific position
- This directive is added to #allNotesContainer element
*/
app.directive('addNoteListener_OLD', ['$document', 
  function($document){
    return {
      restrict: 'A',
      link: link
    };
    function link(scope, element, attrs){
      element.on('click', function(mouse){
        var elementClickedId = mouse.srcElement.id;
        //SAVE:
        // var menuButtonCheckedId = angular.element("#menuContainer .btn-group :checked").attr('id');
        // if( elementClickedId === 'allNotesContainer' && menuButtonCheckedId === 'newNote') {
        if( elementClickedId === 'allNotesContainer'){
          var x = mouse.offsetX;
          var y = mouse.offsetY;
          var noteContainer = angular.element(document.getElementById('noteTemplate').content.cloneNode(true).children[0]);
          element.append(noteContainer);
          noteContainer.css({'position': 'absolute', 'left': x, 'top': y}); //NOTE: Can only modify certain CSS after the element is appended to the DOM
          // angular.element('.textContent').focus();
          // angular.element(('.textContent').on('focusout', function(){
          //   $(this).attr('disabled', true);  //textarea is no longer editable - user will need to click edit
          //   console.log('Will "autosave" in the future');
          // }));
        }
      })
    }
  }
]);


