//headerMenu_controller.js

angular.module('headerMenu_module')
  .controller('menu_controller', ['$rootScope', '$scope', 'notesFactory', 'headerMenu_service', 'hashtagService', 'autocomplete_service', 'modal_service', 'speedRead_service', 'data_service', 'note_service',
    function($rootScope, $scope, notesFactory, headerMenu_service, hashtagService, autocomplete_service, modal_service, speedRead_service, data_service, note_service) {
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
            data_service.delete(headerMenu_service.getScope().key);
          }
        } else {
          console.log("Select a note prior to clicking delete.");
        }
      };

      $scope.toggleModal = function() {
        modal_service.toggle();
      };

      window.addEventListener("paste", pasteHandler)  //paste is a special event (i.e. Command-v)
      function pasteHandler(e) {
        var blob;
        var clipboardData = event.clipboardData  ||  event.originalEvent.clipboardData
        for(var i = 0; i < clipboardData.items.length; i++) {
          if(clipboardData.items[i].type.match(/image/)) {
            blob = clipboardData.items[i].getAsFile();
            console.log(clipboardData.items[i].type);
            break;
          }
        }

        if(blob) {
          var reader = new FileReader();
          reader.onloadend = function(e) {
            var filePayload = e.target.result;
            console.log('will add image to note here');
            note_service.addImage(filePayload);
          };
          reader.readAsDataURL(blob)
        }
      };
    
    }
  ]);

/* 
    pasteImage: (event) ->
      that = @
      clipboardData = event.clipboardData  ||  event.originalEvent.clipboardData
      items = clipboardData.items;
      i = 0
      while i < items.length
        console.log(i)
        if items[i].type.indexOf("image") == 0 
          blob = items[i].getAsFile()
          i = items.length
        i++

      # load image if there is a pasted image:      
      if (blob != null)
        reader = new FileReader();
        reader.onloadend = (e) -> 
          filePayload = e.target.result
          node = new App.Models.Node({
            text: "Title goes here"
            username: 'me of course'
            imageData: filePayload
          })
          node.setAbsCoordinates($('body').width() / 2, $('body').height() / 2)
          that.collection.add(node)
        reader.readAsDataURL(blob)
*/
