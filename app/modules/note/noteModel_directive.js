// noteModel_directive.js

var app = angular.module('note_module');

app.directive('noteModelDirective', ['$rootScope', 'autocomplete_service', function($rootScope, autocomplete_service){
    return {
      restrict: "E",
      controller: 'note-controller',  // NOTE: ng-controller="note-controller" does NOT appear in the HTML!
      // template: "<div> {{note.title}} </div>",  //alternative to templateURL below
      templateUrl: './app/modules/note/note_template.html',
      link: link
    };

    function link($scope, element, attrs) {
      element.on('focusout', function() {
        autocomplete_service.insertText($scope.note.data.text, $scope.key);
      });
      // var hashTags;
      // element.on('focusout', function() {
      //   // hashTags = $scope.note.data.text.match(/\#\w*/g) || null;  //TODO: use this line for multiple hashtags
      //   hashTags = $scope.note.data.text.match(/\#\w*/) || null;
      //   $scope.note.data.hashTags = hashTags;  //Ok to set to null, which overwrites hashTags that were just deleted by a user
      //   if(hashTags) {
      //     headerMenu_service.setHashTags(hashTags, $scope.key);
      //   }
      //   $scope.$emit('update:note', 'note_controller.js');
      // });
    }
  }
]);

