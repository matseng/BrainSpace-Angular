/*
- addNote_directive.js
- Listens for mouse click to add a new note at a specific position
- This directive is added to #allNotesContainer element
*/
angular.module('headerMenu_module')
  .directive('addNoteDirective', ['$document', '$compile', '$rootScope', 'navigationService', 'headerMenu_service',
    function($document, $compile, $rootScope, navigationService, headerMenu_service){
      return {
        restrict: 'A',
        scope: {},
        link: link
      };

      function link($scope, element, attrs){
        var Note2 = function(note) {
          this.data = {};
          this.data = {
            text: note.body,
            parentGroup: [],
            x: note.position.left,
            y: note.position.top,
          };
          this.style = {
            left: note.position.left,
            top: note.position.top,
            width: note.dimensions ? note.dimensions.width : 192,
            height: note.dimensions ? note.dimensions.height : 100,
            'font-size': "10pt"
          };
        };

        var timeMousedown;

        $document.on('mousedown', function(mouse){
          timeMousedown = new Date().getTime();
        });

        $document.on('mouseup', function(mouse){
          // var menuButtonSelected = $rootScope.menuState;
          var menuButtonSelected = headerMenu_service.getRadioButtonState();
          if(menuButtonSelected === 'newNote') {
            var timeMouseup = new Date().getTime();
            var clickDuration = timeMouseup - timeMousedown;
            var elementClickedId = mouse.srcElement.id;
            // console.log(elementClickedId);
            if (clickDuration < 333 && (elementClickedId == 'allNotesContainer' 
              || elementClickedId == 'allNotesContainerBackground'
              || mouse.srcElement.dataset.type == 'group') ) {
              var scale = navigationService.getScale();
              var containerX = element[0].getBoundingClientRect().left;  //element points to #allNotesContainer
              var containerY = element[0].getBoundingClientRect().top;
              var x = mouse.clientX;
              var y = mouse.clientY;
              var deltaAbsX = (x - containerX) * 1/scale; 
              var deltaAbsY = (y - containerY) * 1/scale; 
              var coordinates = {'position': 'absolute', 'left': deltaAbsX, 'top': deltaAbsY};
              var dimensions = {'width': 192, 'height': 50};

              var noteObject = {
                title: 'Title',
                body: '',
                position: coordinates,
                dimensions: dimensions
              };

              var note2 = new Note2(noteObject);
              console.log(note2);
              $scope.$emit('addNote', 'addNote_directive.js', note2);
            }
          }
        });
      }
    }
  ]);
