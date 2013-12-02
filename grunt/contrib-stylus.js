module.exports = function(grunt) {

  grunt.config('stylus', {
    dev: {
      options: {compress: false},
      files: [{src: 'app/css/app.styl', dest: 'build/wwwroot/app.css'}],
    },
    prod: {
      files: '<%= stylus.dev.files %>',
    },
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

};
