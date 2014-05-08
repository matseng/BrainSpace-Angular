angular.module('speedRead_module', []);

angular.module('speedRead_module')
  .directive('speedRead', ['speedRead_service', function(speedRead_service) {
    return {
      restrict: 'A',
      controller: function($scope, $element) {
        $scope.speedRead = function() {
          speedRead_service.displayAndPlay();
        };
      }
    };
  }]);

angular.module('speedRead_module')
  .service('speedRead_service', ['headerMenu_service', function(headerMenu_service) {
    var selectedScope;
    var noteKeys;
    var words;

    this.displayAndPlay = function() {
      //open modal
      //start playing words from a group or a note
      var words = getWordsFromSelectedScope();
      console.log(words);
      // setInterval(function(){

      // }, 333);
    };

    var getWordsFromSelectedScope = function() {
      selectedScope = headerMenu_service.getScope();
      if('group' in selectedScope) {
        console.log('group');
      } else if('note' in selectedScope) {
        console.log('note');
        return getWordsFromNote(selectedScope)
      }
    };

    var getWordsFromNote = function(noteScope) {
      var text = noteScope.note.data.text;
      var words = text.match(/\S+/g);
      return words;
    };



  }]);
