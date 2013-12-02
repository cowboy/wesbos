module.exports = function(grunt) {

  grunt.config('symlink', {
    dev: {
      src: ['*', '!build'],
      dest: 'build/wwwroot',
      expand: true,
      filter: 'isDirectory',
    }
  });

  grunt.loadNpmTasks('grunt-contrib-symlink');

};
