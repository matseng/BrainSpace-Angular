//render.service.js
angular.module('canvas.module')
  .service('render_service', ['data_service', '$controller', '$compile', function(data_service, $controller, $compile) {
    var notes = data_service.getNotes();
    var groups = data_service.getGroups;
    var $canvas = angular.element(document.getElementById('allNotesContainer'));
    var canvasScope = $canvas.scope();
    
    angular.forEach(notes, function(note, key) {
      var scope = canvasScope.$new();
      var ctrl = $controller('note-controller', {$scope:scope});
      scope.key = key;
      scope.note = note;
      var $compiled = $compile(angular.element('<note_model_directive></note_model_directive>'))(scope);
      $canvas.append($compiled);
    });

  }]);

        
