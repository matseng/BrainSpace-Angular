/*
* Setup: Add autocomplete.module.js to index.html, inject autcomplete module into app.js, inject autocomplete_service into menu_controller.js
*/

angular.module('autocomplete', [])
  .service('autocomplete_service', [function() {

  }])

  .controller('autocomplete_controller', ['$scope', 'notesFactory', '$filter', function($scope, notesFactory, $filter) {
    $scope.notes2 = notesFactory.getNotes2();
    // $scope.searchInput;

    var friends = [{name:'John', phone:'555-1276'}, {name:'Mary', phone:'800-BIG-MARY'}];
      // [{name:'John', phone:'555-1276'},
      // {name:'Mary', phone:'800-BIG-MARY'},
      // {name:'Mike', phone:'555-4321'},
      // {name:'Adam', phone:'555-5678'},
      // {name:'Julie', phone:'555-8765'},
      // {name:'Juliette', phone:'555-5678'}];

    $scope.searchInputChanged = function() {
      var noteText;
      var keys = $scope.notes2.$getIndex();
      // console.log($scope.notes2);
      // console.log($scope.searchInput);
      var searchRegExp = new RegExp($scope.searchInput);
      var myFilter = function(key) {
        noteText = $scope.notes2[key].data.text;
        return searchRegExp.test(noteText);
      };
      var matchingNoteKeys = $filter('filter')(keys, myFilter);
      // var test = $filter('filter')($scope.notes2, $scope.searchInput);
      for(var i = 0; i < matchingNoteKeys.length; i++) {
        console.log($scope.notes2[matchingNoteKeys[i]].data.text);
      }
    };



  }]);
