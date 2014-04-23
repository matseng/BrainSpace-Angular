//render.service.js
angular.module('canvas.module')
  .service('render.service', ['notesFactory', '$document', function(notesFactory, $document) {
    var notes2 = notesFactory.getNotes2();
    var groups2 = notesFactory.getGroups2();
    var canvas = $document[0].getElementById('allNotesContainer');

    // notes2.$on('child_added', function(childSnapShot, prev) {
    //   console.log(childSnapShot);
      
    //   <note_model_directive ng-repeat="(key, note) in notes2"></note_model_directive>
    //   <div data-type="note" draggable_directive resizable_div_directive class='noteContainer' id="{{key}}" ng-style="{left: note.style.left, top: note.style.top, width: note.style.width, height: note.style.height}">
    //   <textarea class="note" ng-model='note.data.text' ng-mousedown='noteMousedown($event)' ng-change="change()" placeholder="Notes..." ng-style="{'font-size': note.style['font-size']}"></textarea>
    //   </div>
      

    // });

  }]);
