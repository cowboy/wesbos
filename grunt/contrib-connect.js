module.exports = function(grunt) {

  grunt.config('connect', {
    options: {
      hostname: '*',
      base: 'build/wwwroot',
    },
    dev: {},
    prod: {
      options: {
        keepalive: true,
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};
