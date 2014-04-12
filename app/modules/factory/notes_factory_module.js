// notes_factory_module.js

angular.module('notes_factory_module', ['firebase'])
  .factory('notesFactory', ['$firebase', function($firebase){
    var ref = new Firebase('https://brainspace-biz.firebaseio.com/');
    var allData = $firebase(ref);
    var groupsRef = ref.child('groups');
    var groupsCollection = $firebase(groupsRef);  //$firebase is from AngularFire library
    var notesRef = ref.child('notes');
    var notes = $firebase(notesRef);  //$firebase is from AngularFire library
    var allNotesScope = {};

    return {
      getNotes: function(){
        return notes;
      },
      addNote: function(note) {
        notes.$add(note);
      },
      deleteObject: function(scope) {
        if(scope.note)
          notes.$remove(scope.key);
        else if (scope.group)
          groupsCollection.$remove(scope.key);
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
      }
    };
  }
]);
