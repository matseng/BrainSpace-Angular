angular.module('speedRead_module', []);

angular.module('speedRead_module')
  .service('speedRead_service', ['headerMenu_service', function(headerMenu_service) {
    var selectedObjectScope = headerMenu_service.getScope();
    console.log(selectedObjectScope);
  }]);
