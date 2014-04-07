/*
- Listens for mouse click to add new notes at a specific position
- This directive is added to #allNotesContainer element
*/
angular.module('add_note_module', [])
  app.directive('addNoteDirective', ['$document', '$compile', '$rootScope', 'navigationService',
    function($document, $compile, $rootScope, navigationService){
      return {
        restrict: 'A',
        link: link
      };

      function link($scope, element, attrs){
        var timeMousedown;

        $document.on('mousedown', function(mouse){
          timeMousedown = new Date().getTime();
        });

        $document.on('mouseup', function(mouse){
          var elementClickedId = mouse.srcElement.id;
          var menuButtonSelected = $rootScope.menuState;
          if(menuButtonSelected === 'newNote') {
            var timeMouseup = new Date().getTime();
            var clickDuration = timeMouseup - timeMousedown;
            console.log(clickDuration);
            if (clickDuration < 333 && (elementClickedId === 'allNotesContainer' 
              || elementClickedId === 'allNotesContainerBackground') ) {
              var scale = navigationService.getScale();
              var containerX = element[0].getBoundingClientRect().left;
              var containerY = element[0].getBoundingClientRect().top;
              var x = mouse.clientX;
              var y = mouse.clientY;
              var deltaAbsX = (x - containerX) * 1/scale; 
              var deltaAbsY = (y - containerY) * 1/scale; 
              var coordinates = {'position': 'absolute', 'left': deltaAbsX, 'top': deltaAbsY};
              var dimensions = {'width': 192, 'height': 50};

              var note = {
                title: 'Title',
                body: 'Details...',
                position: coordinates,
                dimensions: dimensions
              };
              $scope.$emit('addNote', note);
            
            // angular.element('.textContent').focus();
            // angular.element(('.textContent').on('focusout', function(){
            //   $(this).attr('disabled', true);  //textarea is no longer editable - user will need to click edit
            //   console.log('Will "autosave" in the future');
            // }));
            }
          }
        });
      }
    }
  ]);
