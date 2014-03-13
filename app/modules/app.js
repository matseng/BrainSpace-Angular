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
