// navigation_service.js
angular.module('BrainSpace')
  .service('navigationService', [function(){
    
    var scale = 1;
    var t = {'tx': 0, 'ty': 0};
    
    this.setScale = function(newScale){
      scale = newScale;
    };

    this.getScale = function(){
      return scale;
    };

    this.setTranslate = function(x, y){
      t.tx = x;
      t.ty = y;
    };

    this.getTx = function(){
      return t.tx;
    };

    this.getTy = function(){
      return t.ty;
    };

  }]);
