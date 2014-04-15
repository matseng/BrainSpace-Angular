// noteModel_directive.js

var app = angular.module('note_module');

app.directive('noteModelDirective', ['$rootScope', 'headerMenu_service', function($rootScope, headerMenu_service){
    return {
      restrict: "E",
      controller: 'note-controller',  // NOTE: ng-controller = "note-controller" does NOT appear in the HTML!
      // template: "<div> {{note.title}} </div>",
      templateUrl: './app/modules/note/note_template.html',
      link: link
    };
    function link($scope, element, attrs){

      element.on('mousedown', function(){
        //TODO: Refactor to ng-click in note-controller
          //AND move references to $rootScope into headerMenu_service

        headerMenu_service.setScope($scope, element);
        $rootScope.noteSelected = {scope: $scope, element: element};

        // var selectable = {
        //   '-webkit-touch-callout': true,
        //   '-webkit-user-select': true,
        //   '-khtml-user-select': true,
        //   '-moz-user-select': true,
        //   '-ms-user-select': true,
        //   'user-select': true
        // };
        // element.css(selectable);
        // console.log(element, selectable);
      });

      // element.on('mouseup', function(){
      //   //TODO: Refactor to resizeableDiv_directive?
      //   var width = element.find('textarea').css('width');
      //   var height = element.find('textarea').css('height');
      //   var body_style = {width: width, height: height};
      //   $scope.note.body_style = body_style;
      //   // $scope.$emit('update:note', 'noteModel_directive.js', $scope);
      // });

      element.find('textarea')[0].focus();  //sets focus to textarea of the most recently added note
    }
  }
]);

