// modal.directive.js/*
/*
* modal_directive must be placed at same level in DOM as the controller
*/

angular.module('headerMenu_module')
  .directive('modalDirective', ['$compile', function($compile) {
    return {
      restrict: 'A',
      link: link
    };

    function link ($scope, $element, attrs) {
      var $modal;
      $scope.toggleModal = function() {
        if(document.body.getElementsByClassName('modal').length === 0) {
          console.log('hello world 2');
          var modalString = "<div class='modalContainer'><div class='modalBackground'></div><div class='modal'><span>Hello World, Hello World, Hello World, Hello World, Hello World</span></div></div>";
          $modal = angular.element(modalString);
          $compile($modal)($scope);
          angular.element(document.body).append($modal);
        } else {
          if($modal.css('visibility') === 'hidden')
            $modal.css({'visibility': 'visible'});
          else 
            $modal.css({'visibility': 'hidden'});
        }
      };
    };

  }]);
