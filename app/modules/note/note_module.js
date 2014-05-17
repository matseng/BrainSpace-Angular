angular.module('note_module', []);

angular.module('note_module')
  .service('note_service', ['data_service', 'navigationService', function(data_service, navigationService) {

    var Note = function() {
      this.data = {
        text: 'Testing add image',
        parentGroup: [],
        x: 0,
        y: 0,
        image: []
      };
      this.style = {
        left: 0,
        top: 0,
        width: 'inherit',
        height: 'inherit',
        'font-size': '10pt'
      };
    };

/*
* //Below causes error in Firebase b/c this object's prototype is a function that can't be saved
    Note.prototype.setImage = function(filePayload) {
      this.data.image = filePayload;
    };
*/

  var setImage = function(note, filePayload) {
    note.data.image = filePayload;
  };

  var setPosition = function(note) {
    note.data.x = -navigationService.getTx();  //get global center x,y
    note.data.y = -navigationService.getTy();
  }

    this.addImage = function(filePayload) {
      var note = new Note();
      setImage(note, filePayload);
      // setPosition(note);
      console.log(note);
      data_service.addNote(note);
      //add note via data_service
        //then work on data_service --> noteModel_directive --> note_template to render the image by replacing the textarea with an image
      //give image left, right the coordinate of the mouse
    };

  }]);
