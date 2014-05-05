/*
* hashtag.module.js
*/

angular.module('hashtag.module', []);

angular.module('hashtag.module')
  .service('hashtagService', [function() {
    var hashtags = {};  // {hashtag: noteKeysArray}

    this.setHashtags = function(currHashTag, key) {
      if(!(currHashTag in hashtags)) {
        hashtags[currHashTag] = [];
      }
      hashtags[currHashTag].push(key); 
      console.log(hashtags);
    };

    this.getHashtags = function() {
      return hashtags;
    };

    this.getKeysForHashTag = function(hashtag) {
      return hashtags[hashtag];
    }

  }]);

angular.module('hashtag.module')
  .directive('hashtagMenu', ['hashtagService', function(hashtagService) {
    return {
      restrict: 'A',
      link: link
    };

    function link($scope, element, attrs) {
      var noteKeysPrevious = [];
      $scope.hashTag = 'Select #...';
      $scope.hashTagChanged = function() {
        var noteKeys = hashtagService.getKeysForHashTag($scope.hashTag) || [];
        console.log(noteKeys);
        for(var i = 0; i < noteKeysPrevious.length; i++) {
          var note = angular.element(document.getElementById(noteKeysPrevious[i]));
          note.removeClass('highlightShadow');
        }
        for(var i = 0; i < noteKeys.length; i++) {
          var note = angular.element(document.getElementById(noteKeys[i]));
          note.addClass('highlightShadow');
        }
        noteKeysPrevious = noteKeys;
      };
    };
  }]);

angular.module('hashtag.module')
  .directive('hashtag', ['hashtagService', function(hashtagService) {
    return {
      restrict: 'A',
      link: link
    };

    function link($scope, element, attrs) {
      var hashtags;
      element.on('focusout', function() {
        hashtags = $scope.note.data.text.match(/\#\w*/g) || null;
        $scope.note.data.hashtags = hashtags;  //Ok to set to null, which overwrites hashtags that were just deleted by a user
        if(hashtags) {
          for(var i = 0; i < hashtags.length; i++) {
            hashtagService.setHashtags(hashtags[i], $scope.key);
          }
        }
        $scope.$emit('update:note', 'note_controller.js');
      });
    }
  }]);
