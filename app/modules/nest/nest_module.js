angular.module('nest_module', []);

angular.module('nest_module')
  .service('nest_service', ['data_service', function(data_service) {
    var notes2 = data_service.getNotes();
    var groups2 = data_service.getGroups();

    this.findChildren = function(groupKey, collection, callback) {
      var group = groups2[groupKey];
      var children = [];
      angular.forEach(collection, function(child, childKey) {
        if(inBounds(group, child)) {
          callback(groupKey, childKey);
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

  }]);
