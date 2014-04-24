//render.service.js
angular.module('canvas.module')
  .service('render.service', ['notesFactory', '$document', '$rootScope', '$controller', '$compile',
    function(notesFactory, $document, $rootScope, $controller, $compile) {
      var notes2 = notesFactory.getNotes2();
      var groups2 = notesFactory.getGroups2();
      var $canvas = angular.element($document[0].getElementById('allNotesContainer'));
      var canvasScope = $canvas.scope();

      notes2.$on('child_added', function(data) {
        var scope = canvasScope.$new();
        var ctrl = $controller('note-controller', {$scope:scope});
        scope.key = data.snapshot.name;
        scope.note = data.snapshot.value;
        var $compiled = $compile(angular.element('<note_model_directive></note_model_directive>'))(scope);
        $canvas.append($compiled);
      });

      groups2.$on('child_added', function(data) {
        var scope = canvasScope.$new();
        var ctrl = $controller('group_controller', {$scope:scope});
        scope.key = data.snapshot.name;
        scope.group = data.snapshot.value;
        var groupEl = "<div draggable_directive resizable_div_directive class='group' ng-style='{left: group.style.left, top: group.style.top, width: group.style.width, height: group.style.height}' data-type='group' ng-mousedown='groupMousedown($event)'>";
        var $compiled = $compile(angular.element(groupEl))(scope);
        $canvas.append($compiled);
      });
    }
  ]);
