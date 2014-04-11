// navigation_service.js
angular.module('navigation_module')
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

    this.getTy = function() {
      return t.ty;
    };

    this.getTransformString = function() {
      var str = "-webkit-transform: matrix(" + scale + ", 0, 0, " + scale + ", " + t.tx + ', ' + t.ty +');';
      // var str = '-webkit-transform: scale(' + scale + ',' + scale + ');';
      return str;
    }

  }]);
