//app.js

var app = angular.module("BrainSpace", ['firebase']);

// app.factory('notesFactory', ['$firebase', 
//   function($firebase){
//     var ref = new Firebase('https://brainspace-biz.firebaseio.com/');
//     var notesCollection = $firebase(ref);
//     return notesCollection;
//   }
// ]);

// app.factory('notesFactory', ['$firebase', 
//   function($firebase){
//     var ref = new Firebase('https://brainspace-biz.firebaseio.com/');
//     var notesCollection = $firebase(ref);
//     return {
//       getNotes: function(){
//         return notesCollection;
//       },
//       addNote: function(noteObj){
//         notesCollection.$add(noteObj, function(err){
//           if(err)
//             console.log("Error saving note object to Firebase: " + err);
//           else
//             console.log("Note object successfully saved to Firebase");
//         });
//       },
//       updateNoteText: function(noteScope) {
//         var key = noteScope.key;
//         notesCollection.$child(key).$save();
//       },
//       updateNotePosition: function(noteScope) {
//         var key = noteScope.key;
//         notesCollection.$update({key: noteScope.note});
//       },
//       deleteNote: function(key){
//         notesCollection.$remove(key);
//       },
//     }
//   }
// ]);

// app.controller("allNotes-controller", ['$scope', 'notesFactory', 
//   $scope.init = function(neighborhood) {
//     // bind Firebase data to scope variable 'data'
//     var FBURL = 'https://brainspace-biz.firebaseio.com/';
//     $scope.data = $firebase(new Firebase(FBURL + note));

//       // monitor data for updates and check weather setting
//       $scope.data.$on('loaded', checkWeather);
//       $scope.data.$on('change', checkWeather);
//    };
// ]);

// function checkWeather() {
//   debugger
// };


app.controller("allNotes-controller", ['$scope', '$firebase', 
  function($scope, $firebase){
    var ref = new Firebase('https://brainspace-biz.firebaseio.com/');
    $scope.notes = $firebase(ref);
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

    $scope.submitButtonClicked = function(){
      if(! $scope.note){
        $scope.note = {};
        $scope.note.title = 'no title yet';
        $scope.note.body = 'no text yet';
      }
      var note = {
        title: $scope.note.title,
        body: $scope.note.body
      }
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
app.directive('addNoteListener', ['$document', "$compile",
  function($document, $compile){
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
          // var noteContainer = angular.element(document.getElementById('noteTemplate').content.cloneNode(true).children[0]);
          var noteContainer = document.getElementById('noteTemplate').content.cloneNode(true).children[0];
          var noteContainer2 = $compile( noteContainer)( scope );
          element.append(noteContainer2);
          //scope.$emit('updateNote', $scope); 
          noteContainer2.css({'position': 'absolute', 'left': x, 'top': y}); //NOTE: Can only modify certain CSS after the element is appended to the DOM
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




