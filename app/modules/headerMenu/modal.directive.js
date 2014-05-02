// modal.directive.js/*
/*
* modal_directive must be placed at same level in DOM as the controller
*/

angular.module('headerMenu_module')
  .directive('modalDirective', ['$document', function($document) {
    return {
      restrict: 'A',
      link: link
    };

    function link($scope, $element, attrs) {
      console.log('hello world');
      // var modalString = "<div class='modalContainer'><div class='modal'>Hello World</div></div>";
      // var $modal = angular.element(modalString);
      // $document.append($modal);
    };

  }]);
