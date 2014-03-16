// note_model_directive.js

angular.module('BrainSpace')
  .directive('noteModelDirective', [function(){
    return {
      restrict: "A",
      link: link
    };
    function link($scope, element, attrs){
      element.on('focusout', function(){
        $scope.$emit('updateNote', $scope);
      });
    }
  }]);
