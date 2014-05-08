// app.js
// cd into directory with index file, then python -m SimpleHTTPServer 3333
// firebase commands: firebase init, firebase deploy  // https://brainspace-biz.firebaseapp.commands

var app = angular.module("BrainSpace", ['notes_factory_module', 'note_module', 'headerMenu_module', 'navigation_module', 'group_module', 'canvas.module', 'hashtag.module', 'autocomplete_module', 'nest_module', 'speedRead_module', 'modal_module']);
// var app = angular.module("BrainSpace", ['headerMenu_module', 'navigation_module', 'canvas.module', 'hashtag.module', 'autocomplete_module', 'speedRead_module', 'modal_module']);

// angular.module('BrainSpace')
//   .controller('initialize', ['data_service', function(data_service) {
    
//   }]);
