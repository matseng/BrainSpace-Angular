//render.service.js
angular.module('canvas.module')
  .service('render_service', ['notesFactory', '$rootScope', '$controller', '$compile', 'hashtagService', 'autocomplete_service',
    function(notesFactory, $rootScope, $controller, $compile, hashtagService, autocomplete_service) {
      var notes2 = notesFactory.getNotes2();
      var groups2 = notesFactory.getGroups2();
      var $canvas = angular.element(document.getElementById('allNotesContainer'));
      var canvasScope = $canvas.scope();

      notes2.$on('child_added', function(data) {
        var scope = canvasScope.$new();
        var ctrl = $controller('note-controller', {$scope:scope});
        scope.key = data.snapshot.name;
        scope.note = data.snapshot.value;
        if(scope.note.data.hashtags) {
          for(var i = 0; i < scope.note.data.hashtags.length; i++) {
            hashtagService.setHashtags(scope.note.data.hashtags[i], scope.key);
          }
        }
        autocomplete_service.insertText(scope.note.data.text, scope.key);
        var $compiled = $compile(angular.element('<note_model_directive></note_model_directive>'))(scope);
        $canvas.append($compiled);
      });

      groups2.$on('child_added', function(data) {
        var scope = canvasScope.$new();
        var ctrl = $controller('group_controller', {$scope:scope});
        scope.key = data.snapshot.name;
        scope.group = data.snapshot.value;
        var groupEl = "<div draggable_directive resizable_div_directive nest_children_directive class='group' ng-style='{left: group.style.left, top: group.style.top, width: group.style.width, height: group.style.height}' data-type='group' ng-mousedown='groupMousedown($event)'>";
        var $compiled = $compile(angular.element(groupEl))(scope);
        // $canvas.append($compiled);
      });
    }
  ]);
