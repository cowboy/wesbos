module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      config: {
        options: {jshintrc: '.jshintrc'},
        src: ['Gruntfile.js', 'config/**/*.js'],
      },
      app: {
        options: {jshintrc: 'app/.jshintrc'},
        src: ['app/**/*.js'],
      },
    },
    clean: {
      build: ['build'],
    },
    symlink: {
      dev: {
        src: ['*', '!build'],
        dest: 'build/wwwroot',
        expand: true,
        filter: 'isDirectory',
      }
    },
    jade: {
      options: {
        data: {
          config: require('./config/app'),
          target: '<%= grunt.task.current.target %>',
        },
      },
      dev: {
        expand: true,
        cwd: 'app/pages',
        src: '*.jade',
        dest: 'build/wwwroot',
        ext: '.html',
      },
      prod: '<%= jade.dev %>',
    },
    stylus: {
      dev: {
        options: {compress: false},
        files: [{src: 'app/css/app.styl', dest: 'build/wwwroot/app.css'}],
      },
      prod: {
        files: '<%= stylus.dev.files %>',
      },
    },
    requirejs: {
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
    },
    connect: {
      options: {
        base: 'build/wwwroot',
      },
      dev: {},
      prod: {
        options: {
          keepalive: true,
        },
      },
    },
    watch: {
      livereload: {
        options: {
          livereload: true,
        },
        files: ['app/**/*.{js,hbs}', 'build/wwwroot/*'],
        tasks: [],
      },
      jshint: {
        files: ['<%= jshint.config.src %>', '<%= jshint.app.src %>'],
        tasks: ['jshint']
      },
      jade: {
        files: ['app/pages/*.jade', 'config/**/*'],
        tasks: ['jade:dev'],
      },
      stylus: {
        files: ['<%= stylus.dev.files[0].src %>'],
        tasks: ['stylus:dev'],
      },
    },
    'gh-pages': {
      site: {
        options: {
          base: 'build/wwwroot',
          clone: 'build/gh-pages',
        },
        src: ['**/*'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-symlink');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build',
    'Build site files for testing or deployment.',
    ['jshint', 'clean', 'jade:prod', 'requirejs:prod', 'stylus:prod']);

  grunt.registerTask('deploy',
    'Deploy site via gh-pages.',
    ['build', 'gh-pages']);

  grunt.registerTask('dev',
    'Start a live-reloading dev webserver on localhost.',
    ['jshint', 'clean', 'symlink:dev', 'jade:dev', 'stylus:dev', 'connect:dev', 'watch']);

  grunt.registerTask('prod',
    'Publish to build/wwwroot and start a webserver on localhost.',
    ['build', 'connect:prod:keepalive']);

  grunt.registerTask('default', ['dev']);

};
