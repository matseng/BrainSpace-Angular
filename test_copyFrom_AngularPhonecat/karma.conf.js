module.exports = function(config){
  config.set({
<<<<<<< HEAD:config/karma.conf.js
    basePath : '../',

    files : [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
=======

    basePath : '../',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-mocks/angular-mocks.js',
>>>>>>> 980cda03680fd0d964428c0d46fff3312744b911:test/karma.conf.js
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
<<<<<<< HEAD:config/karma.conf.js
  });
};
=======

  });
};
>>>>>>> 980cda03680fd0d964428c0d46fff3312744b911:test/karma.conf.js
