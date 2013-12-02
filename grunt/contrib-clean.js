module.exports = function(grunt) {

  grunt.config('clean', {
    build: ['build'],
  });

  grunt.loadNpmTasks('grunt-contrib-clean');

};
