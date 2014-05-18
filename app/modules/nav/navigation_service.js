// navigation_service.js
angular.module('navigation_module')
  .service('navigationService', [function(){

    var scale = 1;
    var t = {'tx': 0, 'ty': 0};
    var initialCenterX, initialCenterY;
    var mouseWindowX;
    var mouseWindowY;
    
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

    /*
    * Converts window coordinates into global coordinates
    * If not window coordinate is provided, defaults to center of the window
    */
    this.getX = function(windowX) {
      var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      windowX = windowX || mouseWindowX || w.innerWidth / 2 || e.clientWidth / 2 || g.clientWidth / 2;
      var globalX = (windowX - (initialCenterX + t.tx)) / scale + initialCenterX;
      return globalX;
    };

    this.getY = function(windowY) {
      var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      windowY = windowY || mouseWindowY || w.innerHeight / 2 || e.clientHeight / 2 || g.clientHeight / 2;
      var globalY = (windowY - (initialCenterY + t.ty)) / scale + initialCenterY;
      return globalY;
    };

    var addMouseListener = (function() {
      var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0];
      initialCenterX = w.innerWidth / 2 || e.clientWidth / 2 || g.clientWidth / 2;
      initialCenterY = w.innerHeight / 2 || e.clientHeight / 2 || g.clientHeight / 2;
      var target = w || d || e || g;
      target.addEventListener('mousemove', setMouseWindowCoordinates);
    })();

    function setMouseWindowCoordinates(mouse) {
      mouseWindowX = mouse.clientX;
      mouseWindowY = mouse.clientY;
    };

  }]);
