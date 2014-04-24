//render.service.js
angular.module('canvas.module')
  .service('render.service', ['notesFactory', '$document', '$rootScope', '$controller', '$compile',
    function(notesFactory, $document, $rootScope, $controller, $compile) {
      var notes2 = notesFactory.getNotes2();
      var groups2 = notesFactory.getGroups2();
      var $canvas = angular.element($document[0].getElementById('allNotesContainer'));

      notes2.$on('child_added', function(data, prev) {
        var scope = $rootScope.$new();
        var ctrl = $controller('note-controller', {$scope:scope});
        scope.note = data.snapshot.value;
        var $compiled = $compile(angular.element('<note_model_directive></note_model_directive>'))(scope);
        $canvas.append($compiled);
      });
    }
  ]);
