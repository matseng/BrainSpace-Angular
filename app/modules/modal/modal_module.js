angular.module('modal_module', []);

angular.module('modal_module')
  .controller('modal_controller', ['$scope', 'modal_service', function($scope, modal_service) {
    $scope.text = 'hello, hello world';
    
    $scope.$on('modal:update', function(event, fromFile, word, offset) {
      modal_service.visible();
      modal_service.setOffset(offset);
      $scope.text = word;
      $scope.$apply();
      console.log(word);
    });

  }]);

  angular.module('modal_module')
  .directive('modalDirective', ['modal_service', function(modal_service) {
    return {
      restrict: 'A',
      link: link
    };

    function link($scope, $element, attrs) {
      $element.on('click', function(event) {
        if(event.srcElement.id === 'modalBackground') {
          modal_service.hidden();
        }
      });
    }
  }]);

  angular.module('modal_module')
    .service('modal_service', [function() {
      var $modal = angular.element(document.getElementById('modalBackground'));
      var $modalSpan = angular.element(document.getElementById('modalSpan'));

      this.visible = function() {
        $modal.css({visibility: 'visible'});
      };

      this.hidden = function() {
        $modal.css({visibility: 'hidden'});
      };

      this.toggle = function() {
        if(!$modal.css('visibility') || $modal.css('visibility') === 'hidden') {
          $modal.css({visibility: 'visible'});
        } else {
          $modal.css({visibility: 'hidden'});
        }
      };

      this.setOffset = function(offset) {
        $modalSpan.css({left: offset});
      };

      this.insert = function($modalContent) {
        $modal.append($modalContent);
      };

  }]);
