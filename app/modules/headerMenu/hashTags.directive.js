angular.module('headerMenu_module')
  .directive('hashTags', ['headerMenu_service', function(headerMenu_service) {
    return {
      restrict: 'A',
      link: link
    };

    function link($scope, element, attrs){
      var noteKeysPrevious = [];
      $scope.hashTagChanged = function() {
        var noteKeys = headerMenu_service.getKeysForHashTag($scope.hashTag);
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
