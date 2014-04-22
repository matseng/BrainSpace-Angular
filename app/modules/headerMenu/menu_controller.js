//headerMenu_controller.js

angular.module('headerMenu_module')
  .controller('menu_controller', ['$rootScope', '$scope', 'notesFactory', 'headerMenu_service',
    function($rootScope, $scope, notesFactory, headerMenu_service) {
      $scope.buttonSelected = null;
      $scope.menuState = 'explore'; //explore, newNote, drawGroup
      $rootScope.menuState = $scope.menuState;

      $scope.$watch('menuState', function(newState){
        $rootScope.menuState = newState;
        headerMenu_service.setRadioButtonState($scope.menuState);
      });

      $scope.fontSizeString = "10pt";
      $scope.$on('scope.update', function() {
      // $scope.$on('noteClicked', function() {
        //TODO: DOM view is not updating font size unless an element dragged
        $scope.fontSizeString = headerMenu_service.getFontSizeString();
        // $scope.$apply();  //trying to get DOM to update without needing to drag the element
        // console.log('in menu-controller: ', $scope.fontSizeString);
        // console.log(typeof $scope.fontSizeString);
      });

      $scope.deleteButtonClicked = function(event){
        if(headerMenu_service.getScope()){
          if(confirm("Confirm delete?")) {
            notesFactory.deleteObject(headerMenu_service.getScope());
          }
        } else {
          console.log("Select a note prior to clicking delete.");
        }
      };
    }
  ]);
