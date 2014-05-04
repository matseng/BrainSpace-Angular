/*
* hashtag.module.js
*/

angular.module('hashtag.module', []);

angular.module('hashtag.module')
  .service('hashtagService', [function() {
    var hashtags = {};

  }]);

angular.module('hashtag.module')
  .directive('hashtagMenu', ['headerMenu_service', function(headerMenu_service) {
    return {
      restrict: 'A',
      link: link
    };

    function link($scope, element, attrs){
      var noteKeysPrevious = [];
      $scope.hashTag = 'Select #...';
      $scope.hashTagChanged = function() {
        var noteKeys = headerMenu_service.getKeysForHashTag($scope.hashTag) || [];
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
          headerMenu_service.setHashTags(hashTags, $scope.key);
        }
        $scope.$emit('update:note', 'note_controller.js');
      });
    }
  }]);
