module.exports = function(grunt) {

  grunt.config('requirejs', {
    prod: {
      options: {
        baseUrl: '.',
        mainConfigFile: 'app/config/requirejs.js',
        deps: ['app/app'],
        insertRequire: ['app/app'],
        name: 'bower_components/almond/almond',
        out: 'build/wwwroot/app.js',
        optimize: 'uglify2',
        generateSourceMaps: true,
        preserveLicenseComments: false,
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');

};
