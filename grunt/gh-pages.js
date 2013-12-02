module.exports = function(grunt) {

  grunt.config('gh-pages', {
    site: {
      options: {
        base: 'build/wwwroot',
        clone: 'build/gh-pages',
      },
      src: ['**/*'],
    },
  });

  grunt.loadNpmTasks('grunt-gh-pages');

};
