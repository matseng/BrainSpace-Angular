// notes_factory_module.js

angular.module('notes_factory_module', ['firebase'])
  .factory('notesFactory', ['$firebase', function($firebase){
    var ref = new Firebase('https://brainspace-biz.firebaseio.com/');
    var notesCollection = $firebase(ref);  //$firebase is from AngularFire library
    var groupsRef = ref.child('groups');
    var groupsCollection = $firebase(groupsRef);  //$firebase is from AngularFire library
    var allNotesScope = {};

    return {
      getNotes: function(){
        return notesCollection;
      },
      deleteNote: function(key) {
        notesCollection.$remove(key);
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
