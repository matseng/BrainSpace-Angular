// note_model_directive.js

var app = angular.module('BrainSpace');

app.directive('noteModelDirective', [function(){
    return {
      restrict: "A",
      link: link
    };
    function link($scope, element, attrs){

      element.on('mousedown', function(){
        $scope.$emit('noteSelected', $scope);
      });

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

      element.bind('change', function(event){
        var fontSize = $scope.fontSize;
        var noteTitle = event.srcElement.parentNode.parentNode.getElementsByClassName('noteTitle')[0];
        $scope.note.title_style = {'fontSize': fontSize};
        noteTitle.setAttribute('style', 'font-size: ' + fontSize);
        $scope.$emit('updateNote', $scope);
        // with(noteTitle){'font-size' = fontSize};
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

//TODO: Add directive to font selector
