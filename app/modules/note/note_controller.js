angular.module('note_module')
  .controller('note-controller', ['$scope', 'headerMenu_service', function($scope, headerMenu_service) {
    $scope.fontSize = "12pt";

    $scope.change = function() {
      $scope.$emit('update:note', 'note_controller.js');
    };

    $scope.noteMousedown = function($event) {
      //TODO: refactor from note_model_directive
      console.log($event, 'will use headMenu_sevice here');
    };
}]);



