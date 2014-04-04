// note_model_directive.js

var app = angular.module('BrainSpace');

app.directive('noteModelDirective', ['$rootScope', 'note_menu_service', function($rootScope, note_menu_service){
    return {
      restrict: "E",
      // scope: {  // THIS IS BAD!!!
      //   note: '=',
      // },
      controller: 'note-controller',
      // template: "<div> {{note.title}} </div>",
      templateUrl: './app/modules/note_template.html',
      link: link
    };
    function link($scope, element, attrs){

      element.on('mousedown', function(){
        // $scope.$emit('noteSelected', $scope);
        note_menu_service.setScope($scope);
        $rootScope.noteSelected = {scope: $scope, element: element};
        $rootScope.$broadcast('noteClicked');
      });

      element.on('focusout', function(){
        // $rootScope.noteSelected = null;
        $scope.$emit('updateNote', $scope);
      });

      element.on('mouseup', function(){
        var width = element.find('textarea').css('width');
        var height = element.find('textarea').css('height');
        var body_style = {width: width, height: height};
        $scope.note.body_style = body_style;
        $scope.$emit('updateNote', $scope);
      });

      // element.bind('change', function(event){
      //   var fontSize = $scope.fontSize;
      //   var noteTitle = event.srcElement.parentNode.parentNode.getElementsByClassName('noteTitle')[0];
      //   $scope.note.title_style = {'fontSize': fontSize};
      //   noteTitle.setAttribute('style', 'font-size: ' + fontSize);
      //   $scope.$emit('updateNote', $scope);
      // });

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
