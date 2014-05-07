// data_service.js
angular.module('notes_factory_module')
  .service('data_service', ['notesFactory', '$rootScope', '$controller', '$compile', 'hashtagService', 'autocomplete_service', '$q',
    function(notesFactory, $rootScope, $controller, $compile, hashtagService, autocomplete_service, $q) {
      // var notes2 = notesFactory.getNotes2();
      // var groups2 = notesFactory.getGroups2();
      var notesRef = notesFactory.getNotesRef();
      var groupsRef = notesFactory.getGroupsRef();
      var $canvas = angular.element(document.getElementById('allNotesContainer'));
      var canvasScope = $canvas.scope();
      var notesCollection = {};
      var groupsCollection = {};

      notesRef.on('child_added', function(data) {
        var scope = canvasScope.$new();
        var ctrl = $controller('note-controller', {$scope:scope});
        scope.key = data.name();
        scope.note = data.val();
        autocomplete_service.insertText(scope.note.data.text, scope.key);
        var $compiled = $compile(angular.element('<note_model_directive></note_model_directive>'))(scope);
        $canvas.append($compiled);
        notesCollection[scope.key] = scope.note;
      });

      groupsRef.on('child_added', function(data) {
        var scope = canvasScope.$new();
        var ctrl = $controller('group_controller', {$scope:scope});
        scope.key = data.name();
        scope.group = data.val();
        var groupEl = "<div draggable_directive resizable_div_directive nest_children_directive id='{{key}}' class='group' ng-controller='group_controller' ng-style='{left: group.data.x, top: group.data.y, width: group.style.width, height: group.style.height}' data-type='group' ng-mousedown='groupMousedown($event)'><div class='triangle'></div></div>";
        var $compiled = $compile(angular.element(groupEl))(scope);
        $canvas.append($compiled);
        groupsCollection[scope.key] = scope.group;
      });

      this.getNotes = function() {
        return notesCollection;
      };

      this.getGroups = function() {
        return groupsCollection;
      };

      this.addNote = function(note2) {
        var defered = $q.defer();
        var newNoteRef = notesRef.push();
        newNoteRef.set(note2, function() {
          defered.resolve(newNoteRef.name());
        });
        return defered.promise;
      };

      this.addGroup = function(group2) {
        groupsRef.push(group2);
      };

      this.saveKey = function(key) {  //NOTE working bc of data sync problem btw firebase obj and scope obj
        var obj = {};
        if(key in notesCollection) {
          obj[key] = notesCollection[key];
          notesRef.update(obj)
        } else if(key in groupsCollection) {
          obj[key] = groupsCollection[key];
          groupsRef.update(obj)
        } else {
          console.log("Error");
        }
      };
    }
  ]);
