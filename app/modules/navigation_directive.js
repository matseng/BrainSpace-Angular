// navigation_directive.js

angular.module('BrainSpace').directive('navigationDirective', [function(){
  return {
    restrict: 'A',
    link: link
  };

  function link($scope, element, attrs) {
    element.bind('mousedown', function(event) {
      if(event.srcElement.id === 'allNotesContainer'){
      // console.log($scope, element, attrs, event);
       console.log(element);
      }
    });
  };
}]);