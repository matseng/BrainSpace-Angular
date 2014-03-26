// zoom_module.js

angular.module('zoom_module', [])
  .directive('zoomDirective', ['$document', function($document){
    return {
      restrict: 'A',
      link: link
    };
    function link(){
      //detect two-finger drag (e.g. right click drag)
      $document.bind('DOMMouseScroll mousewheel wheel', function(mouse){
        mouse.preventDefault();
        if(mouse.deltaY > 0)
          console.log("Going up: " + mouse.deltaY);
        else 
          console.log("Going down: " + mouse.deltaY);
      });
    };
  }]);

// $(document.body).on("DOMMouseScroll mousewheel wheel", (e) ->
//   e.preventDefault()
//   if e.originalEvent.deltaY > 0  #fingers going up  --> zoom in
//     window.Transform.centerX = $('body').width() / 2
//     window.Transform.centerY = $('body').height() / 2
//     window.Transform.zoom *= 1.2
//     vent.trigger('zoom')
//     console.log("Zoom in " + window.Transform.zoom)
//   else if e.originalEvent.deltaY < 0  #fingers going down
//     window.Transform.centerX = $('body').width() / 2
//     window.Transform.centerY = $('body').height() / 2
//     window.Transform.zoom *= .8
//     vent.trigger('zoom')
//     console.log("Zoom out " + window.Transform.zoom)
// )
