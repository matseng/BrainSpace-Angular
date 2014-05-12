angular.module('modal_module', []);

angular.module('modal_module')
  .controller('modal_controller', ['$scope', function($scope) {
    $scope.text = 'hello, hello world';
    
    $scope.$on('modal:update', function(event, fromFile, word) {
      modalVisible();
      $scope.text = word;
      $scope.$apply();
      console.log(word);
    });

    var modalVisible = function() {
      var $modal = angular.element(document.getElementById('modalContainer'));
      $modal.css({visibility: 'visible'});
    };

    var toggleModal = function() {
      var $modal = angular.element(document.getElementById('modalContainer'));
      if(!$modal.css('visibility') || $modal.css('visibility') === 'hidden') {
        $modal.css({visibility: 'visible'});
      } else {
        $modal.css({visibility: 'hidden'});
      }
    };

  }]);

  angular.module('modal_module')
  .directive('modalDirective', [function() {
    return {
      restrict: 'A',
      // controller: myController,
      // templateURL: myTemplateURLFilename,
      link: link
      // controller: function($scope, $element){}
    };

    function link($scope, $element, attrs) {
      $element.on('click', function(event) {
        if(event.srcElement.classList.contains('modalBackground')) {
          if(!$element.css('visibility') || $element.css('visibility') === 'hidden') {
            $element.css({visibility: 'visible'});
          } else {
            $element.css({visibility: 'hidden'});
          }
        }
      });
    }
  }]);

  // angular.module('modal_module')
  // .service('modal_service', [function() {
  //   var $modal = 

  // }]);
