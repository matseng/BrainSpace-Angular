//render.service.js
angular.module('canvas.module')
  .service('render.service', ['notesFactory', '$document', '$rootScope', '$controller', '$compile',
    function(notesFactory, $document, $rootScope, $controller, $compile) {
      var notes2 = notesFactory.getNotes2();
      var groups2 = notesFactory.getGroups2();
      var $canvas = angular.element($document[0].getElementById('allNotesContainer'));
      var canvasScope = $canvas.scope();

      notes2.$on('child_added', function(data, prev) {
        var scope = canvasScope.$new();
        var ctrl = $controller('note-controller', {$scope:scope});
        scope.key = data.snapshot.name;
        scope.note = data.snapshot.value;
        console.log(notes2);
        var $compiled = $compile(angular.element('<note_model_directive></note_model_directive>'))(scope);
        $canvas.append($compiled);
      });
    }
  ]);
