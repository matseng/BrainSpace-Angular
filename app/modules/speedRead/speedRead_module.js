angular.module('speedRead_module', []);

angular.module('speedRead_module')
  .directive('speedRead', ['speedRead_service', 'data_service', function(speedRead_service, data_service) {
  // .directive('speedRead', ['speedRead_service', function(speedRead_service) {
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
  // .service('speedRead_service', ['headerMenu_service', '$rootScope', function(headerMenu_service, $rootScope, nest_service) {
  .service('speedRead_service', ['data_service', 'headerMenu_service', '$rootScope', 'nest_service', function(data_service, headerMenu_service, $rootScope, nest_service) {
    var selectedScope;
    var noteKeys;
    var words;
    var notes = data_service.getNotes();

    this.displayAndPlay = function() {
      //open modal
      //start playing words from a group or a note
      var words = getWordsFromSelectedScope();
      console.log(words);
      var length = words.length;
      var i = 0;
      var recur = function() {
        $rootScope.$broadcast('modal:update', 'speedRead_service', words[i]);
        console.log(words[i]);
        i += 1;
        if(i < length) {
          setTimeout(recur, 166);
        }
      }
      recur();
    };

    var getWordsFromSelectedScope = function() {
      selectedScope = headerMenu_service.getScope();
      if('group' in selectedScope) {
        console.log('group');
        return getWordsFromGroup(selectedScope);
      } else if('note' in selectedScope) {
        console.log('note');
        return getWordsFromNote(selectedScope)
      }
    };

    var getWordsFromNote = function(noteScopeOrKey) {
      var text, words;
      if (typeof noteScopeOrKey === 'string') {
        text = notes[noteScopeOrKey].data.text;
      } else {
        text = noteScopeOrKey.note.data.text;
      }
      words = text.match(/\S+/g);
      return words;
    };

    var getWordsFromGroup = function(groupScope) {
      var groupKey = groupScope.key;
      var noteKeys = nest_service.findChildren(groupKey, 'notes');
      nest_service.sortByY(noteKeys);
      var allWords = [];
      var allWordsTemp;
      angular.forEach(noteKeys, function(noteKey) {
        allWordsTemp = Array.prototype.concat(allWords, getWordsFromNote(noteKey));
        allWords = allWordsTemp;
      });
      return allWords;
    };



  }]);
