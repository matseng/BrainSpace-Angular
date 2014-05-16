angular.module('note_module', []);

angular.module('note_module')
  .service('note_service', [function() {

    var Note = function() {
      this.data = {
        text: '',
        parentGroup: [],
        x: 0,
        y: 0,
        image: []
      };
      this.style = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        'font-size': 0
      };
    };

    Note.prototype.setImage = function(filePayload) {
      this.data.image = filePayload;
    };

    this.addImage = function(filePayload) {
      var note = new Note();
      note.setImage(filePayload);
      console.log(note);
      //add note via data_service
        //then work on data_service --> noteModel_directive --> note_template to render the image by replacing the textarea with an image
      //give image left, right the coordinate of the mouse
    };

  }]);
