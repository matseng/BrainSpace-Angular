// refactorData.service.js

angular.module('notes_factory_module')
  .service('refactorData', ['notesFactory', '$q',
    function(notesFactory, $q) {
      var notes = notesFactory.getNotes();
      var groups = notesFactory.getGroups();
      var notes2 = notesFactory.getNotes2();
      var groups2 = notesFactory.getGroups2();
      var key0;
      var key1 = {};

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
        var key0 = Object.keys(notes);
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
        notes2.$update(noteObj);

        if(parentGroupKey) {
          var groupObj = groupsData[parentGroupKey];
          if(!groupObj.data.childNotes)
            groupObj.data.childNotes = [];
          if(groupObj.data.childNotes.indexOf(keyNote) == -1) {
            groupObj.data.childNotes.push(keyNote);
            key1[keyNote] = keyNote;
            var groupObjTemp = {};
            groupObjTemp[parentGroupKey] = groupObj;
            // console.log(parentGroupKey);
            groups2.$update(groupObjTemp);
          }
        }
      };

      var updateNearestGroupAncestorKey = function(subject, key, groupsCollection) {
        //TODO: Save parent / children for each group
        // console.log(key);
        var parentGroupKey = null;
        var minDist = null;
        var currDist;
        var deltaX, deltaY;
        angular.forEach(groupsCollection, function(group, keyGroup) {
          groupRight = group.style.left + group.style.width;
          groupBottom = group.style.top + group.style.height;
          if(group.style.left <= subject.style.left && subject.style.left <= groupRight
            && group.style.top <= subject.style.top && subject.style.top <= groupBottom) {
            deltaX = subject.style.left - group.style.left;
            deltaY = subject.style.top - group.style.top;
            currDist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
            if(!minDist || currDist < minDist){
              minDist = currDist;
              parentGroupKey = keyGroup;
            }
          }
        });

        subject.data.parentGroup = parentGroupKey;
        var subjectObj = {};
        subjectObj[key] = subject;
        console.log(subjectObj);
        groups2.$update(subjectObj);

        if(parentGroupKey) {
          var groupObj = groupsCollection[parentGroupKey];
          groupObj.data.childGroups = groupObj.data.childGroups || [];
          if(groupObj.data.childGroups.indexOf(key) == -1) {
            groupObj.data.childGroups.push(key);
            var groupObjTemp = {};
            groupObjTemp[parentGroupKey] = groupObj;
            groups2.$update(groupObjTemp);
          }
        }

      }

      var refactorNotes = function(notes) {
        notes2.$remove();
        var promArr = [];
        angular.forEach(notes, function(note, key) {
          var currProm;
          var note2 = new Note2(note);
          currProm = notes2.$add(note2);
          promArr.push(currProm);
        });
        return $q.all(promArr);
      };

      var refactorGroups = function(groups) {
        groups2.$remove();
        var promArr = [];
        angular.forEach(groups, function(group, key) {
          var currProm;
          var group2 = new Group2(group);
          currProm = groups2.$add(group2);
          promArr.push(currProm);
        });
        return $q.all(promArr);
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
        var promAllGroups = refactorGroups(groups);
        promAllGroups.then(function (res) {
          console.log(res[0].name());
        })
        .then(function() {
          return refactorNotes(notes);
        })
        .then(function(res) {
          console.log(res[0].name());
          var ref = notesFactory.getRef();
          ref.once("value", function(data) {
            // console.log(data.val());
            var notesData = data.val().notes2;
            var groupsData = data.val().groups2;
            angular.forEach(notesData, function(note, key) {
              updateNearestAncestorKey(note, key, groupsData); 
            });
            
            
            angular.forEach(groupsData, function(group, key) {
              updateNearestGroupAncestorKey(group, key, groupsData); 
            });
            
            console.log('done');
/*
            var sum = 0;
            angular.forEach(groupsData, function(group, key) {
              if(group.data.childNotes)
                sum += group.data.childNotes.length;
              // updateNearestGroupAncestorKey(group, key, groups2); 
            });
            console.log(sum);
            console.log(key1);
            console.log(Object.keys(key1).length);
            var keys = Object.keys(notesData);
            console.log(keys.length);
            for(var i = 0; i < keys.length; i++) {
              if((keys[i] in key1))
                console.log('found: ', keys[i]);
              else{
                console.log('not found(!): ', keys[i]);
                console.log(notesData[keys[i]]); 
              }
            }
*/
          });

        });
      });

    }
  ]);
