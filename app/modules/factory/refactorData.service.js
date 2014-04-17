// refactorData.service.js

angular.module('notes_factory_module')
  .service('refactorData', ['notesFactory', '$q',
    function(notesFactory, $q) {
      var groups = notesFactory.getGroups();
      var notes = notesFactory.getNotes();
      var keys = groups.$getIndex();
      console.log("count: " + keys.length);

      var deferred1 = $q.defer();
      groups.$on('loaded', function(groups){
        // var keys = groups.$getIndex();
        // for(var i = 0; i < keys.length; i++) {
        //   console.log(keys[i]);
        //   console.log(groups[keys[i]]);
        // }
        deferred1.resolve(groups);
        // console.log("count: " + keys.length);
      });

      var deferred2 = $q.defer();
      notes.$on('loaded', function(notes){
        // var keys = notes.$getIndex();
        deferred2.resolve(notes);
        //console.log("count: " + keys.length);
      });

      var getNearestAncestorKey = function(note, groups) {
        var parentGroupKey = null;
        var minDist = null;
        var currDist;
        var deltaX, deltaY;
        angular.forEach(groups, function(group, keyGroup) {
          group.right = group.left + group.width;
          group.bottom = group.top + group.height;
          if(group.left <= note.position.left && note.position.left <= group.right
            && group.top <= note.position.top && note.position.top <= group.bottom) {
            deltaX = note.position.left - group.left;
            deltaY = note.position.top - group.top;
            currDist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
            if(!minDist || currDist < minDist){
              minDist = currDist;
              parentGroupKey = keyGroup;
            }
          }
        });
        // console.log(minDist, parentGroupKey);
        return parentGroupKey;
      };

      var promiseAll = $q.all([deferred1.promise, deferred2.promise]);  ////Why can't a deferred instance include its own promise (ie what's the benefit of this line in general)
      promiseAll.then(function(response) {
        var groups = response[0];
        var notes = response[1];

        angular.forEach(notes, function(note, keyNote) {
          console.log(getNearestAncestorKey(note, groups));
        });

        //TODO: Iterate over noteKeys --> create notes2 object with flat structure and save in Firebase
        //Find parent group of each note
          //And thus each group will have childNotes
        //Find parent group of each group
          //And thus each group will have childGroups
      });

    }
  ]);
