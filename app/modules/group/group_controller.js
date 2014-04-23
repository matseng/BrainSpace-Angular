angular.module('group_module')
  .controller('group_controller', ['$scope', 'headerMenu_service', 
    function($scope, headerMenu_service) {
      $scope.groupMousedown = function($event) {
        headerMenu_service.setScope($scope, angular.element($event.srcElement));
      };
    }
  ]);
