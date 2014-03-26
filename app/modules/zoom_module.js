// zoom_module.js

angular.module('zoom_module', [])
  .directive('zoomDirective', [function(){
    return {
      restrict: 'A',
      link: link
    };
    function link(){
      // debugger;
    };
  }]);
