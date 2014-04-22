angular.module('note_module')
  .controller('note-controller', ['$scope', 'headerMenu_service', function($scope, headerMenu_service) {
    // $scope.fontSize = "12pt";

    $scope.change = function() {
      $scope.$emit('update:note', 'note_controller.js');
    };

    $scope.noteMousedown = function($event) {
      headerMenu_service.setScope($scope, angular.element($event.srcElement));
    };
}]);



