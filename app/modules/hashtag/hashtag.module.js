/*
* hashtag.module.js
*/

angular.module('hashtag.module', []);

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
