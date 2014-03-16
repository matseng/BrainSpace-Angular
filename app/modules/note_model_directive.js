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

      element.on('mouseup', function(){
        var width = element.find('textarea').css('width');
        var height = element.find('textarea').css('height');
        var body_style = {width: width, height: height};
        $scope.note.body_style = body_style;
        $scope.$emit('updateNote', $scope);
      });

      // var el = angular.element(element)[0];
      // var selectfontSize = el.getElementsByClassName("selectFontSize")[0];
      // var $selectfontSize = angular.element(selectfontSize);
      // $selectfontSize.on('mouseup', function(){
      //   console.log(this);
      // });
    }
  }
]);
