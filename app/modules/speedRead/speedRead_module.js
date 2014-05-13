angular.module('speedRead_module', []);

angular.module('speedRead_module')
  .directive('speedRead', ['speedRead_service', 'data_service', function(speedRead_service, data_service) {
  // .directive('speedRead', ['speedRead_service', function(speedRead_service) {
    return {
      restrict: 'A',
      controller: function($scope, $element) {
        $scope.speedReadClicked = function() {
          speedRead_service.displayAndPlay();
        };
      }
    };
  }]);

angular.module('speedRead_module')
  // .service('speedRead_service', ['headerMenu_service', '$rootScope', function(headerMenu_service, $rootScope, nest_service) {
  .service('speedRead_service', ['data_service', 'headerMenu_service', '$rootScope', 'nest_service', 'modal_service', function(data_service, headerMenu_service, $rootScope, nest_service, modal_service) {
    var selectedScope;
    var noteKeys;
    var words;
    var notes = data_service.getNotes();

    this.displayAndPlay = function() {
      var words = getWordsFromSelectedScope();
      words = words || ['ooo', '00000'];
      if(words) {
        console.log(words);
        var length = words.length;
        var i = 0;
        var recur = function() {
          $rootScope.$broadcast('modal:update', 'speedRead_service', words[i], leftOfCenterOffset(words[i]));
          // modal_service will replace $broadcast
          i += 1;
          if(i < length) {
            setTimeout(recur, 300);
          }
        }
        recur();
      }
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

    var leftOfCenterIndex = function(word) {
      var targetIndex;
      if(word.length % 2 === 0) {
        targetIndex = word.length / 2 - 1;
      } else if (word.length === 3) {
        targetIndex = 1;
      } else {
        targetIndex = Math.floor(word.length / 2) - 1;
      }
      return targetIndex;
    };

    var getWidth = function(word) {
      var width;
      var $modalContent = angular.element(document.getElementById('modalContent'));
      angular.element(document.getElementById('currentWord')).remove();
      var $word = angular.element("<div id='currentWord'>" + word + "</div>");
      $word.css({position: 'absolute', visibility: 'hidden'});
      $modalContent.append($word);
      width = $word[0].getBoundingClientRect().width;
      return width;
    };

    var makeModalDiv = function() {
      var $div = angular.element(
        "<div class='modal'>  \
          <div class='verticalLine'></div>  \
          <div class='tableCell' id='modalContent'>  \
            <span id='modalSpan' class='textBox'>{{text}}</span>  \
          </div>  \
        </div>");
    };

    var insertWord = function(word) {
      var $modalSpan = angular.element(document.getElementById('modalSpan'));
      var $wordDiv = makeWordDiv(word, leftOfCenterIndex(word));
      $modalSpan.html($wordDiv);
    };

    var makeWordDiv = function(word, targetIndex) {
      var $div = angular.element("<div class='focusWord'></div>");
      for(var i = 0; i < word.length; i++) {
        if(i === targetIndex) {
          $div.append("<span class='focusChar'>" + word[i] + "</span>");
        } else {
          $div.append("<span>" + word[i] + "</span>");
        }
      }
    };

    var leftOfCenterOffset = function(word) {
      var offset;
      var targetIndex = leftOfCenterIndex(word);
      var wordWidth, subStringWidth;
      var wordCenter = getWidth(word) / 2;
      var targetPosition = (getWidth(word.substring(0, targetIndex)) + getWidth(word.substring(0, targetIndex + 1))) / 2; 
      offset = wordCenter - targetPosition;
      return offset;
    }

  }]);
