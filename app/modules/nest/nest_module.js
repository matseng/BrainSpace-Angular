angular.module('nest_module', []);

angular.module('nest_module')
  .service('nest_service', ['notesFactory', function(notesFactory) {
    var notes2 = notesFactory.getNotes2();
    var groups2 = notesFactory.getGroups2();

    this.findChildren = function(groupKey, collection, callback) {
      var group = groups2[groupKey];
      var children = [];
      _each(collection, function(child, childKey) {
        if(inBounds(group, child)) {
          callback(groupKey, childKey);
          children.push(childKey);
        }
      });
      return children;
    };

    this.findParent = function(key, callback) {};

    var _each = function(collection, callback) {
      var args = Array.prototype.slice.call(arguments, 2);
      var keys = collection.$getIndex();
      var val, key;
      for(var i = 0; i < keys.length; i++) {
        key = keys[i];
        val = collection[key];
        callback(val, key, args);
      }
    };

    var inBounds = function(group, target) {
      groupRight = group.data.x + group.style.width;
      groupBottom = group.data.y + group.style.height;
      if(group.data.x < target.data.x && target.data.x < groupRight
        && group.data.y < target.data.y && target.data.y < groupBottom) {
       return true; 
      }
    };

  }]);
