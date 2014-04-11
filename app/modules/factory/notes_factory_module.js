// notes_factory_module.js

angular.module('notes_factory_module', ['firebase'])
  .factory('notesFactory', ['$firebase', function($firebase){
    var ref = new Firebase('https://brainspace-biz.firebaseio.com/');
    var notesCollection = $firebase(ref);
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
      }
    };
  }
]);
