angular.module('note_module', []);

angular.module('note_module')
  .service('note_service', ['data_service', function(data_service) {

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
        width: 192,
        height: 50,
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

    this.addImage = function(filePayload) {
      var note = new Note();
      setImage(note, filePayload);
      console.log(note);
      data_service.addNote(note);
      //add note via data_service
        //then work on data_service --> noteModel_directive --> note_template to render the image by replacing the textarea with an image
      //give image left, right the coordinate of the mouse
    };

  }]);
