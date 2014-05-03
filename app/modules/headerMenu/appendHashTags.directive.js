angular.module('headerMenu_module')
  // .directive('appendHashTags', ['render_service', function(render_service) {
  .directive('appendHashTags', ['hashTag', function(hashTag) {
    return {
      restrict: 'A',
      link: link
    };


    function link($scope, element, attrs){
      var obj = hashTag.get();
      console.log(obj);
      // console.log('hello world');
    };

  }]);
