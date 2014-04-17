// refactorData.service.js

angular.module('notes_factory_module')
  .service('refactorData', ['notesFactory', '$q',
    function(notesFactory, $q) {
      var groups = notesFactory.getGroups();
      var notes = notesFactory.getNotes();
      var keys = groups.$getIndex();
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

      var newNotesCollection = {};
      var Note2 = function(note, parentGroupKey) {
        this.data = {
          text: note.body,
          parentGroup: parentGroupKey,
          left: note.position.left,
          top: note.position.top,
          width: note.dimensions ? note.dimensions.width : 192,
          height: note.dimensions ? note.dimensions.height : 100
        };
        this.style = {
          'font-size': note.textarea_style ? note.textarea_style.fontSize : "10pt"
        };
      }
      
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
        var note2 = new Note2(note, parentGroupKey);
        newNotesCollection[key] = note2;
        //console.log(note2);
        //TODO: For each non-null parentGroupKey, create a new Group2 and add the current keyNote as a child
        // return parentGroupKey;
      };

      var promiseAll = $q.all([deferred1.promise, deferred2.promise]);  ////Why can't a deferred instance include its own promise (ie what's the benefit of this line in general)
      promiseAll.then(function(response) {
        var groups = response[0];
        var notes = response[1];

        angular.forEach(notes, function(note, key) {
          getNearestAncestorKey(note, key, groups);
        });
        console.log(newNotesCollection, Object.keys(newNotesCollection).length);

        //TODO: Iterate over noteKeys --> create notes2 object with flat structure and save in Firebase
        //Find parent group of each note
          //And thus each group will have childNotes
        //Find parent group of each group
          //And thus each group will have childGroups
      });

    }
  ]);
