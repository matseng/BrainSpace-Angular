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
        console.log(element, attrs);
        var width = element.find('textarea').css('width');
        var height = element.find('textarea').css('height');
        var body_style = {width: width, height: height};
        $scope.note.body_style = body_style;
        $scope.$emit('updateNote', $scope);
      });
    }
  }
]);

// angular.moduel('BrainSpace')
//   .directive('resizeNotearea', [function(){
//     return {
//       restrict: 'A',
//       link: function($scope, element, attrs){
//         element.on()
//           console.log($scope, element, attrs);
//       }
//     }
//   }
// ]);
