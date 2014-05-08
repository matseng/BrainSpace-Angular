angular.module('speedRead_module', []);

angular.module('speedRead_module')
  .directive('speedRead', ['speedRead_service', function(speedRead_service) {
    return {
      restrict: 'A',
      controller: function($scope, $element) {
        $scope.speedRead = function() {
          speedRead_service.getWords();
        };
      }
    };
  }]);

angular.module('speedRead_module')
  .service('speedRead_service', ['headerMenu_service', function(headerMenu_service) {
    var selectedObjectScope;
    var noteKeys;
    var words;

    this.getWords = function() {
      selectedScope = headerMenu_service.getScope();
      if('group' in selectedScope) {
        console.log('group');
      } else if('note' in selectedScope) {
        console.log('note');
      }
    };
  }]);
