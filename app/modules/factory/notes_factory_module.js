// notes_factory_module.js

angular.module('notes_factory_module', ['firebase'])
  .factory('notesFactory', ['$firebase', function($firebase){
    var ref = new Firebase('https://brainspace-biz.firebaseio.com/');
    var allData = $firebase(ref);
    var groupsRef = ref.child('groups2');
    var groupsCollection = $firebase(groupsRef);  //$firebase is from AngularFire library
    var notesRef = ref.child('notes2');
    var notes = $firebase(notesRef);
    var allNotesScope = {};
    var notesRef2 = ref.child('notes2');
    var notes2 = $firebase(notesRef2);
    var groupsRef2 = ref.child('groups2');
    var groups2 = $firebase(groupsRef2);

    return {
      getNotesRef: function() {
        return notesRef;
      },
      getGroupsRef: function() {
        return groupsRef;
      },
      getNotes: function(){
        return notes;
      },
      addNote: function(note) {
        notes.$add(note);
      },
      deleteObject: function(scope) {
        if(scope.note) {
          notes2[scope.key] = scope.note;  //NOTE: This line is a hack to resolve different note objects for the same initial note data 
          notes2.$remove(scope.key);
          scope.$destroy();
        }
        else if (scope.group)
          groups2.$remove(scope.key);
      },
      setScope: function(scope) {
        allNotesScope = scope;
      },
      getScope: function() {
        return allNotesScope;
      },
      getGroups: function() {
        return groupsCollection;
      },
      addGroup: function(groupObject) {
        // groupsRef.push(groupObject);
        groupsCollection.$add(groupObject)
      },
      getData: function() {
        return allData;
      },
      getRef: function() {
        return ref;
      },
      getNotes2: function() {
        return notes2;
      },
      getGroups2: function() {
        return groups2;
      },
      updateNote: function (key) {
        notes2.$save(key);
      },
      forEach: function(collection, callback) {
        var keys = collection.$getIndex();
        var key, val;
        for(var i = 0; i < keys.length; i++) {
          key = keys[i];
          val = collection[key];
          callback(val, key);
        }
      }
    };
  }
]);
