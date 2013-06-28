module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      app: ['app/**/*.js'],
    },
    jade: {
      options: {
        data: {
          config: require('./config/config.json'),
          target: '<%= grunt.task.current.target %>',
        },
      },
      dev: {
        expand: true,
        cwd: 'app/pages',
        src: '*.jade',
        dest: 'dist',
        ext: '.html',
      },
      prod: '<%= jade.dev %>',
    },
    handlebars: {
      options: {
        amd: true,
        processName: function(name) {
          return require('path').basename(name, '.hbs');
        },
      },
      templates: {
        src: 'app/templates/*.hbs',
        dest: 'temp/templates.js',
      },
    },
    stylus: {
      dev: {
        options: {compress: false},
        files: [{src: 'app/css/app.styl', dest: 'dist/app.css'}],
      },
      prod: {
        files: '<%= stylus.dev.files %>',
      },
    },
    requirejs: {
      prod: {
        options: {
          baseUrl: '',
          mainConfigFile: 'config/requirejs.js',
          name: 'components/almond/almond',
          out: 'dist/app.js',
          optimize: 'uglify2',
        },
      },
    },
    connect: {
      dev: {
        options: {
          middleware: function(connect, options) {
            return [
              // Serve files in /dist as if they were in the root.
              connect.static(__dirname + '/dist'),
              // But serve everything else from the root.
              connect.static(__dirname),
            ];
          },
        },
      },
      prod: {
        options: {
          base: 'dist',
          keepalive: true,
        },
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      app: {
        files: ['app/**/*.js'],
      },
      jade: {
        files: ['app/pages/*.jade', 'config/config.json'],
        tasks: ['jade:dev'],
      },
      handlebars: {
        files: ['<%= handlebars.templates.src %>'],
        tasks: ['handlebars'],
      },
      stylus: {
        files: ['<%= stylus.dev.files[0].src %>'],
        tasks: ['stylus'],
      },
    },
    'gh-pages': {
      site: {
        options: {
          base: 'dist',
          clone: 'temp/gh-pages',
        },
        src: ['**/*'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build',
    'Build site files for testing or deployment.',
    ['jshint', 'jade:prod', 'handlebars', 'requirejs:prod', 'stylus:prod']);

  grunt.registerTask('deploy',
    'Deploy site via gh-pages.',
    ['build', 'gh-pages']);

  grunt.registerTask('dev',
    'Start a live-reloading dev webserver on localhost.',
    ['jshint', 'jade:dev', 'handlebars', 'stylus:dev', 'connect:dev', 'watch']);

  grunt.registerTask('prod',
    'Publish to dist/ and start a webserver on localhost.',
    ['build', 'connect:prod:keepalive']);

  grunt.registerTask('default', ['dev']);

};
