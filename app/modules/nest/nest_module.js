angular.module('nest_module', []);

angular.module('nest_module')
  // .service('nest_service', [function() {
  .service('nest_service', ['data_service', function(data_service) {
    var notes = data_service.getNotes();
    var groups = data_service.getGroups(); 
    this.setNotesAndGroups = function() {};

    this.findChildren = function(groupKey, collection, callback) {
      var group = groups[groupKey];
      var children = [];
      if(typeof collection === 'string') {
        collection = (collection === 'notes') ? notes : (collection === 'groups') ? groups : 'Error';
      }
      angular.forEach(collection, function(child, childKey) {
        if(inBounds(group, child)) {
          if(callback) { 
            callback(groupKey, childKey);
          }
          children.push(childKey);
        }
      });
      return children;
    };

    this.findParent = function(key, callback) {};

    var inBounds = function(group, target) {
      groupRight = group.data.x + group.style.width;
      groupBottom = group.data.y + group.style.height;
      if(group.data.x < target.data.x && target.data.x < groupRight
        && group.data.y < target.data.y && target.data.y < groupBottom) {
       return true; 
      }
    };

    this.sortByY = function(arrayOfKeys) {
      arrayOfKeys.sort(function(keyA, keyB) {
        var Ya = notes[keyA].data.y;
        var Yb = notes[keyB].data.y;
        return Ya - Yb;
      });
    };

  }]);
