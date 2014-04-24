angular.module('note_module')
  .controller('note-controller', ['$scope', 'headerMenu_service', 
    function($scope, headerMenu_service) {
    // $scope.fontSize = "12pt";
      // $scope.data = {};
      // $scope.style = {};
      $scope.myNote = {};

      $scope.change = function() {
        $scope.$emit('update:note', 'note_controller.js');
      };

      $scope.noteMousedown = function($event) {
        headerMenu_service.setScope($scope, angular.element($event.srcElement));
      };

      $scope.get = function(property) {
        if (property in $scope.note.style)
          return $scope.note.style[property];
        else (property in $scope.note.data)
          return $scope.note.data[property];
      };

      $scope.set = function(property, val) {
        if (property in $scope.note.style)
          $scope.note.style[property] = val;
        else (property in $scope.note.data)
          $scope.note.data[property] = val;
      };

      // $scope.setData = function(data) {
      //   for(prop in data) {
      //     $scope.data[prop] = data[prop];
      //   }
      // };

      // $scope.setStyle = function(style) {
      //   for(prop in style) {
      //     $scope.style[prop] = style[prop];
      //   }
      // };
    }
  ]);



