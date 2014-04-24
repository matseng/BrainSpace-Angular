//render.service.js
angular.module('canvas.module')
  .service('render.service', ['notesFactory', '$document', '$rootScope', '$controller', 
    function(notesFactory, $document, $rootScope, $controller) {
      var notes2 = notesFactory.getNotes2();
      var groups2 = notesFactory.getGroups2();
      var canvas = $document[0].getElementById('allNotesContainer');

      notes2.$on('child_added', function(data, prev) {
        //var key = data.snapshot.name;
        // var noteData = data.snapshot.data;
        // var style = data.snapshot.style;
        var scope = $rootScope.$new();
        var ctrl = $controller('note-controller', {$scope:scope});
        // scope.setData(data.snapshot.data);
        // scope.setStyle(data.snapshot.style);
        console.log(scope);
        scope.myNote = data.snapshot.value;
        //<note_model_directive></note_model_directive>

      });
    }
  ]);
