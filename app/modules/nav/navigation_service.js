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
    };

    this.getGlobalCoordinates = function(windowX, windowY) {
      var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      windowX = windowX || w.innerWidth || e.clientWidth || g.clientWidth,
      windowY = windowY || w.innerHeight|| e.clientHeight|| g.clientHeight;
      var globalX = (windowX / 2 - t.tx) * (1 / scale);
      var globalY = (windowY / 2 - t.ty) * (1 / scale);
      //TODO...
    };

  }]);
