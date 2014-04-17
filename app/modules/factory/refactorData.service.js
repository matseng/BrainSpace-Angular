// refactorData.service.js

angular.module('notes_factory_module')
  .service('refactorData', ['notesFactory', '$q',
    function(notesFactory, $q) {
      var groups = notesFactory.getGroups();
      var notes = notesFactory.getNotes();
      var keys = groups.$getIndex();
      var notes2 = notesFactory.getNotes2();
      var groups2 = notesFactory.getGroups2();
      console.log("count: " + keys.length);
      
      // var newGroupsCollection = {}; 
      // var Group2 = function() {
      //   this = {
      //     data: {
      //       parentGroup: null,
      //       childNotes: null,
      //       childGroups: null
      //     },
      //     style: null
      //   };
      // };

      var Note2 = function(note) {
        this.data = {
          text: note.body,
          parentGroup: null,
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
          parentGroup: null,
          childNotes: null,
          childGroups: null
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

      var getNearestAncestorKey = function(note, key, groups) {
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
        // var note2 = new Note2(note);
        // notes2.$add(note2);
        // newNotesCollection[key] = note2;
        //TODO: For each non-null parentGroupKey, create a new Group2 and add the current keyNote as a child
      };
      var refactorNotes = function(notes) {
        notes2.$remove();
        angular.forEach(notes, function(note, key) {
          var note2 = new Note2(note);
          notes2.$add(note2);
        });
      };

      var refactorGroups = function(groups) {
        groups2.$remove();
        angular.forEach(groups, function(group, key) {
          var group2 = new Group2(group);
          groups2.$add(group2);
        });
      };

      var promiseAll = $q.all([deferred1.promise, deferred2.promise]);  ////Why can't a deferred instance include its own promise (ie what's the benefit of this line in general)
      promiseAll.then(function(response) {
        var groups = response[0];
        var notes = response[1];
        refactorNotes(notes);
        refactorGroups(groups);


        angular.forEach(notes, function(note, key) {
          //getNearestAncestorKey(note, key, groups);
        });
        // console.log(newNotesCollection, Object.keys(newNotesCollection).length);
        //TODO: Iterate over each group to find & set its parent group (also set child group) 
      });

    }
  ]);
