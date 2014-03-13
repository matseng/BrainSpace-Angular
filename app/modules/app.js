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

app.controller("noteSubmit-controller", ['$scope', 'notesFactory',
  function($scope, notesFactory){
    $scope.note = {username: "anonymous"};
    $scope.create = function(){
      var note = {
        title: $scope.note.title, 
        username: $scope.note.username
      };
    notesFactory.addNote(note);
    }
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
      element.on('click', function(){
        var x = mouse.clientX;
        var y = mouse.clientY;
      //TODO: add new note_template.html to x,y location
        // note_template will have it's own directive
        // How will scope data be handle by controller -> factory?
      })
    }
  }
]);


