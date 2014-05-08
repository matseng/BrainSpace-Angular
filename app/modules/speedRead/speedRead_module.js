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
  .service('speedRead_service', ['headerMenu_service', '$rootScope', function(headerMenu_service, $rootScope) {
    var selectedScope;
    var noteKeys;
    var words;

    this.displayAndPlay = function() {
      //open modal
      //start playing words from a group or a note
      var words = getWordsFromSelectedScope();
      var length = words.length;
      var i = 0;
      var recur = function() {
        $rootScope.$broadcast('modal:update', 'speedRead_service', words[i]);
        console.log(words[i]);
        i += 1;
        if(i < length) {
          setTimeout(recur, 333);
        }
      }
      recur();
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
