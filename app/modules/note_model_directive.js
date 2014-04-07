// note_model_directive.js

var app = angular.module('BrainSpace');

app.directive('noteModelDirective', ['$rootScope', 'headerMenu_service', function($rootScope, headerMenu_service){
    return {
      restrict: "E",
      // scope: {  // THIS IS BAD!!!
      //   note: '=',
      // },
      controller: 'note-controller',  // NOTE: ng-controller = "note-controller" does NOT appear in the HTML!
      // template: "<div> {{note.title}} </div>",
      templateUrl: './app/modules/note_template.html',
      link: link
    };
    function link($scope, element, attrs){

      element.on('mousedown', function(){
        headerMenu_service.setScope($scope, element);
        $rootScope.noteSelected = {scope: $scope, element: element};  //TODO: Refactor references to $rootScope into headerMenu_service
      });

      element.on('mouseup', function(){
        var width = element.find('textarea').css('width');
        var height = element.find('textarea').css('height');
        var body_style = {width: width, height: height};
        $scope.note.body_style = body_style;
        $scope.$emit('updateNote', $scope);
      });
    }
  }
]);

