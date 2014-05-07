angular.module('speedRead_module', []);

angular.module('speedRead_module')
  .controller('speedRead_controller', ['headerMenu_service', function(headerMenu_service) {
    var selectedObjectScope = headerMenu_service.getScope();
    console.log(selectedObjectScope);
  }]);
