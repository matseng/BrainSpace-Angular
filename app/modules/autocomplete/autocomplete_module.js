/*
* Setup: Add autocomplete.module.js to index.html, inject autcomplete module into app.js, inject autocomplete_service into menu_controller.js
*/

angular.module('autocomplete_module', [])
  .controller('autocomplete_controller', ['$scope', 'notesFactory', '$filter', 'autocomplete_service', function($scope, notesFactory, $filter, autocomplete_service) {
    $scope.notes2 = notesFactory.getNotes2();
    
    var autocompleteResultsPrevious;
    $scope.searchInputChanged = function() {
      var noteKeys;
      var autocompleteResults;
      var searchInput = $scope.searchInput;
      if(searchInput.length > 0) {
        autocompleteResults = autocomplete_service.autocomplete(searchInput);
        console.log(autocompleteResults);
      }
      for(word in autocompleteResultsPrevious) {
        noteKeys = autocompleteResultsPrevious[word];
        removeHighlight(noteKeys)
      }
      for(word in autocompleteResults) {
        noteKeys = autocompleteResults[word];
        addHighlight(noteKeys)
      }
      autocompleteResultsPrevious = autocompleteResults;
    }
    
    var matchingNoteKeysPrevious;
    $scope.searchInputChanged_Angular = function() {
      var noteText;
      var keys = $scope.notes2.$getIndex();
      var searchRegExp = new RegExp($scope.searchInput, 'i');  //'i' is for case insensitive
      var myFilter = function(key) {
        noteText = $scope.notes2[key].data.text;
        return searchRegExp.test(noteText);
      };
      if($scope.searchInput.length > 0) {
        var matchingNoteKeys = $filter('filter')(keys, myFilter);
      } else {
        matchingNoteKeys = [];
      }
      for(var i = 0; matchingNoteKeysPrevious && i < matchingNoteKeysPrevious.length; i++) {
        var note = angular.element(document.getElementById(matchingNoteKeysPrevious[i]));
        note.removeClass('highlightShadow');
      }
      for(var i = 0; i < matchingNoteKeys.length; i++) {
        var note = angular.element(document.getElementById(matchingNoteKeys[i]));
        note.addClass('highlightShadow');
      }
      matchingNoteKeysPrevious = matchingNoteKeys;
    };

    var removeHighlight = function(noteKeys) {
      var note; 
      for(var i = 0; i < noteKeys.length; i++) {
        note = angular.element(document.getElementById(noteKeys[i]));
        note.removeClass('highlightShadow');
      }
    };

    var addHighlight = function(noteKeys) {
      var note; 
      for(var i = 0; i < noteKeys.length; i++) {
        note = angular.element(document.getElementById(noteKeys[i]));
        note.addClass('highlightShadow');
      }
    };
  }]);
