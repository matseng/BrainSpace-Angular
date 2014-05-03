angular.module('canvas.module')
  .service('hashTags', [function() {
    var hashTags = {};

    this.set = function(currHashTag, key) {
      if(!(currHashTag in hashTags)) {
        hashTags[currHashTag] = [];
      }
      hashTags[currHashTag].push(key); 
      console.log(hashTags);
    };

    this.get = function() {
      return hashTags;
    };
  }]);
