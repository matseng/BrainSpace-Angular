// refactorData.service.js

angular.module('notes_factory_module')
  .service('refactorData', ['notesFactory', '$q',
    function(notesFactory, $q) {
      var groups = notesFactory.getGroups();
      var notes = notesFactory.getNotes();
      var keys = groups.$getIndex();
      console.log("count: " + keys.length);

      var deferred1 = $q.defer();
      groups.$on('loaded', function(){
        var keys = groups.$getIndex();
        for(var i = 0; i < keys.length; i++) {
          console.log(keys[i]);
          console.log(groups[keys[i]]);
        }
        // deferred1.resolve(groups);
        // console.log("count: " + keys.length);
      });

      var deferred2 = $q.defer();
      notes.$on('loaded', function(){
        // var keys = notes.$getIndex();
        deferred2.resolve(notes);
        // console.log("count: " + keys.length);
      });

      var promiseAll = $q.all([deferred1.promise, deferred2.promise]);  ////Why can't a deferred instance include its own promise (ie what's the benefit of this line in general)
      promiseAll.then(function(response) {
        var groups = response[0];
        var notes = response[1];
        // console.log(groupKeys.length);
        // console.log(noteKeys.length);
        // console.log(notes);
        var groupKeys = groups.$getIndex();
        var noteKeys = notes.$getIndex();
        for(var i = 0; i < groupKeys.length; i++) {
          console.log(noteKeys[i]);
          // console.log(notes[noteKeys[i]]);
          console.log(notes.$child(noteKeys[i]).position);
        }
        //TODO: Iterate over noteKeys --> create notes2 object with flat structure and save in Firebase
        //Find parent group of each note
          //And thus each group will have childNotes
        //Find parent group of each group
          //And thus each group will have childGroups
      });

    }
  ]);
