// nestChildren.directive.js

angular.module('group_module')
  .directive('nestChildrenDirective', ['$compile', 'navigationService', 'nest_service', 'headerMenu_service', 'data_service',
    function($compile, navigationService, nest_service, headerMenu_service, data_service) {
      return {
        attribute: "A",
        link: link
      };

      function link($scope, $element, attrs) {
        var notes = data_service.getNotes();
        var groups = data_service.getGroups();

        var syncChild = function($childEl) {  //helper function to keep data sync'd prior to future $save's in firebase
          var childScope = $childEl.scope();
          var child;
          if(childScope && 'note' in childScope) {
            child = $childEl.scope().note;
            notes[childScope.key] = child; 
          } else if(childScope && 'group' in childScope) {
            child = $childEl.scope().group;
            groups[childScope.key] = child; 
          }
          return child;
        };

        var setPositionType = function(child, $childEl, positionType) {
          var childType = $childEl.attr('data-type');
          var childStyle = $childEl.attr('ng-style');
          if(positionType === 'style') {
            $childEl.attr('ng-style', "{left:" + childType + ".style.left, top:" + childType + ".style.top, width:" + childType + ".style.width, height:" + childType + ".style.height}");
            $childEl.css({'left': child.style.left, 'top': child.style.top });
          } else if(positionType === 'data') {
            $childEl.attr('ng-style', "{left:" + childType + ".data.x, top:" + childType + ".data.y, width:" + childType + ".style.width, height:" + childType + ".style.height}");
            $childEl.css({'left': child.data.x, 'top': child.data.y});
          }
        };

        var nestChildInGroup = function(groupKey, childKey) {
          var $groupEl = angular.element(document.getElementById(groupKey));
          var $childEl = angular.element(document.getElementById(childKey));
          var child = syncChild($childEl);
          child.style.left = child.data.x - $groupEl.scope().group.data.x;
          child.style.top = child.data.y - $groupEl.scope().group.data.y;
          setPositionType(child, $childEl, 'style');
          var $childEl2 = $compile($childEl.clone())($childEl.scope());  //create new element & remove old element to avoid weird duplication of directives
          $childEl.scope().$apply();
          $groupEl.append($childEl2);
          $childEl.remove();
        };

        var removeChildFromGroup = function(groupKey, childKey) {
          var $allNotesContainer = angular.element(document.getElementById('allNotesContainer'));
          var $groupEl = angular.element(document.getElementById(groupKey));
          var $childEl = angular.element(document.getElementById(childKey));
          var group = $groupEl.scope().group;
          var child = syncChild($childEl);
          child.data.x = group.data.x + child.style.left;
          child.data.y = group.data.y + child.style.top;
          setPositionType(child, $childEl, 'data');
          var $childEl2 = $compile($childEl.clone())($childEl.scope());
          $childEl.scope().$apply();
          $allNotesContainer.append($childEl2);
          $childEl.remove();
        };

        $element.bind('mousedown', function() {
          if(headerMenu_service.getRadioButtonState() !== 'drawGroup') {
            $scope.group.data.childNotes = nest_service.findChildren($scope.key, notes, nestChildInGroup);
            $scope.group.data.childGroups = nest_service.findChildren($scope.key, groups, nestChildInGroup);
            console.log($scope.group.data.childNotes);
            console.log($scope.group.data.childGroups);
            $element.bind('mouseup', myMouseUp);
          }
        });

        function myMouseUp(event) {
          angular.forEach($scope.group.data.childNotes, function(noteKey, index) {
            removeChildFromGroup($scope.key, noteKey);
            data_service.saveKey(noteKey);
          });
          angular.forEach($scope.group.data.childGroups, function(groupKey, index) {
            removeChildFromGroup($scope.key, groupKey);
            console.log(groupKey);
            data_service.saveKey(groupKey);
          });
        $element.unbind('mouseup', myMouseUp);
        };

      };  //END link
    }
  ]);
