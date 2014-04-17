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
        deferred1.resolve(groups.$getIndex());
        console.log("count: " + keys.length);
      });

      var deferred2 = $q.defer();
      notes.$on('loaded', function(){
        var keys = notes.$getIndex();
        deferred2.resolve(notes.$getIndex());
        console.log("count: " + keys.length);
      });

      var promiseAll = $q.all([deferred1.promise, deferred2.promise]);  ////Why can't a deferred instance include its own promis (ie what's the benefit of this line in general)
      promiseAll.then(function(response) {
        var groupKeys = response[0];
        var noteKeys = response[1];
        console.log(groupKeys);
        console.log(noteKeys);
        //Find parent group of each note
          //And thus each group will have childNotes
        //Find parent group of each group
          //And thus each group will have childGroups
      });

    }
  ]);
