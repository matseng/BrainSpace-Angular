// refactorData.service.js

angular.module('notes_factory_module')
  .service('refactorData', ['notesFactory', '$q',
    function(notesFactory, $q) {
      // var notes = notesFactory.getNotes();
      // var groups = notesFactory.getGroups();
      var notes = notesFactory.getNotes2();
      var groups = notesFactory.getGroups2();

      var Note2 = function(note) {
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
          'font-size': note.textarea_style ? note.textarea_style.fontSize : "10pt"
        };
      }

      var Group2 = function(group, parentGroupKey) {
        this.data = {
          x: group.left,
          y: group.top,
          parentGroup: [],
          childNotes: [],
          childGroups: []
        };
        this.style = {
          left: group.left,
          top: group.top,
          width: group.width,
          height: group.height
        };
      }
      var deferred1 = $q.defer();
      groups.$on('loaded', function(groups){
        deferred1.resolve(groups);
        console.log(Object.keys(groups).length);
      });

      var deferred2 = $q.defer();
      notes.$on('loaded', function(notes){
        deferred2.resolve(notes);
        console.log(Object.keys(notes).length);
      });

      var updateNearestAncestorKey = function(note, keyNote, groupsData) {
        var parentGroupKey = null;
        var minDist = null;
        var currDist;
        var deltaX, deltaY;
        angular.forEach(groupsData, function(group, keyGroup) {
          groupRight = group.style.left + group.style.width;
          groupBottom = group.style.top + group.style.height;
          if(group.style.left <= note.style.left && note.style.left <= groupRight
            && group.style.top <= note.style.top && note.style.top <= groupBottom) {
            deltaX = note.style.left - group.style.left;
            deltaY = note.style.top - group.style.top;
            currDist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
            if(!minDist || currDist < minDist){
              minDist = currDist;
              parentGroupKey = keyGroup;
            }
          }
        });
        
        note.data.parentGroup = parentGroupKey;
        var noteObj = {};
        noteObj[keyNote] = note;
        notes.$update(noteObj);

        if(parentGroupKey) {
          var groupObj = groupsData[parentGroupKey];
          if(!groupObj.data.childNotes)
            groupObj.data.childNotes = [];
          if(groupObj.data.childNotes.indexOf(keyNote) == -1) {
            groupObj.data.childNotes.push(keyNote);
            var groupObjTemp = {};
            groupObjTemp[parentGroupKey] = groupObj;
            groups.$update(groupObjTemp);
          }
        }
      };

      var updateNearestGroupAncestorKey = function(group, key, groupsCollection) {
        //TODO: Save parent / children for each group
        console.log(key);
      }

      var refactorNotes = function(notes) {
        var notes2 = {};
        angular.forEach(notes, function(note, key) {
          var note2 = new Note2(note);
          notes2[key] = note2;
        });
        return notes2;
      };

      var refactorGroups = function(groups) {
        var groups2 = {};
        angular.forEach(groups, function(group, key) {
          var group2 = new Group2(group);
          groups2[key] = group2;
        });
        return groups2;
      };

      var _each = function($collection, callback) {
        var args = Array.prototype.slice.call(arguments, 2);
        var keys = $collection.$getIndex();
        var val, key;
        for(var i = 0; i < keys.length; i++) {
          key = keys[i];
          val = $collection[key];
          callback(val, key, args);
        }
      };

      var promiseAll = $q.all([deferred1.promise, deferred2.promise]);  ////Why can't a deferred instance include its own promise (ie what's the benefit of this line in general)
      promiseAll.then(function(response) {
        refactorNotes
        var groups = response[0];
        var notes = response[1];
        // groups2 = refactorGroups(groups);
        // notes2 = refactorNotes(notes);
        angular.forEach(notes, function(note, key) {
          updateNearestAncestorKey(note, key, groups); 
        });

        angular.forEach(groups, function(group, key) {
          updateNearestGroupAncestorKey(group, key, groups); 
        });

      });

    }
  ]);
