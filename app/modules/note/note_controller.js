angular.module('note_module', [])
  .controller('note-controller', ['$scope', function($scope) {
    $scope.fontSize = "12pt";

    $scope.change = function() {
      $scope.$emit('updateNote', $scope);
    };

  // $scope.click = function() {
  //   //TODO: refactor from note_model_directive
  // };
}]);



