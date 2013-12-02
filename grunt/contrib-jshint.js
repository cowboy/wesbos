module.exports = function(grunt) {

  grunt.config('jshint', {
    config: {
      options: {jshintrc: '.jshintrc'},
      src: ['Gruntfile.js', 'config/**/*.js'],
    },
    app: {
      options: {jshintrc: 'app/.jshintrc'},
      src: ['app/**/*.js'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

};
