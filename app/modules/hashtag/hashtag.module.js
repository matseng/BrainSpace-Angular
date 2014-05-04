/*
* hashtag.module.js
*/

angular.module('hashtag.module', []);

angular.module('hashtag.module')
  .service('hashtagService', [function() {
    var hashtags = {};  // {hashtag: noteKeysArray}

    this.setHashTags = function(currHashTag, key) {
      if(!(currHashTag in hashtags)) {
        hashtags[currHashTag] = [];
      }
      hashtags[currHashTag].push(key); 
      console.log(hashtags);
    };

    this.getHashTags = function() {
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

    function link($scope, element, attrs){
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
  .directive('hashtag', [function() {
    return {
      restrict: 'A',
      link: link
    };

    function link($scope, element, attrs) {
      var hashTags;
      element.on('focusout', function() {
        // hashTags = $scope.note.data.text.match(/\#\w*/g) || null;  //TODO: use this line for multiple hashtags
        hashTags = $scope.note.data.text.match(/\#\w*/) || null;
        $scope.note.data.hashTags = hashTags;  //Ok to set to null, which overwrites hashTags that were just deleted by a user
        if(hashTags) {
          hashtagService.setHashTags(hashTags, $scope.key);
        }
        $scope.$emit('update:note', 'note_controller.js');
      });
    }
  }]);
