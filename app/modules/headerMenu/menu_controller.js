//headerMenu_controller.js

angular.module('headerMenu_module')
  .controller('menu_controller', ['$rootScope', '$scope', 'notesFactory', 'headerMenu_service', 'hashtagService', 'autocomplete_service', 'modal_service', 'speedRead_service',
    function($rootScope, $scope, notesFactory, headerMenu_service, hashtagService, autocomplete_service, modal_service, speedRead_service) {
      $scope.buttonSelected = null;
      $scope.menuState = 'explore'; //explore, newNote, drawGroup
      $rootScope.menuState = $scope.menuState;
      $scope.hashTags = hashtagService.getHashtags();

      $scope.$watch('menuState', function(newState){
        $rootScope.menuState = newState;
        headerMenu_service.setRadioButtonState($scope.menuState);
      });

      $scope.fontSizeString;
      $scope.$on('scope:update', function() {
        $scope.fontSizeString = headerMenu_service.getFontSizeString();
      });

      $scope.selectFontSizeChanged = function() {
        if(headerMenu_service.getScope()) {
          headerMenu_service.setStyle('font-size', event.srcElement.value);
        }
      };

      $scope.deleteButtonClicked = function(event) {
        if(headerMenu_service.getScope()){
          if(confirm("Confirm delete?")) {
            headerMenu_service.getElement().remove();
            notesFactory.deleteObject(headerMenu_service.getScope());
          }
        } else {
          console.log("Select a note prior to clicking delete.");
        }
      };

      $scope.toggleModal = function() {
        modal_service.toggle();
        // console.log("hello world");
        // var $modal = angular.element(document.getElementById('modalBackground'));
        // if(!$modal.css('visibility') || $modal.css('visibility') === 'hidden') {
        //   $modal.css({visibility: 'visible'});
        // } else {
        //   $modal.css({visibility: 'hidden'});
        // }
      };
    }
  ]);
