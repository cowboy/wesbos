
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      app: {
        src: ['app/**/*.js']
      }
    },
    jade: {
      dev: {
        files: [{expand: true, cwd: 'app/pages', src: '*.jade', dest: 'dist', ext: '.html'}],
        options: {
          data: {
            config: require('./config/config.json'),
            debug: true
          }
        },
      },
      prod: {
        files: '<%= jade.dev.files %>',
        options: {
          data: {
            config: require('./config/config.json'),
            debug: false
          }
        },
      }
    },
    handlebars: {
      templates: {
        src: 'app/templates/*.hbs',
        dest: 'temp/templates.js',
        options: {
          amd: true,
          processName: function(name) {
            return require('path').basename(name, '.hbs');
          }
        }
      }
    },
    stylus: {
      dev: {
        options: {compress: false},
        files: [{src: 'app/css/app.styl', dest: 'dist/app.css'}],
      },
      prod: {
        options: {compress: true},
        files: '<%= stylus.dev.files %>',
      }
    },
    requirejs: {
      prod: {
        options: {
          baseUrl: '',
          mainConfigFile: 'config/requirejs.js',
          name: 'components/almond/almond',
          out: 'dist/app.js',
          optimize: 'uglify2',
        }
      }
    },
    connect: {
      dev: {
        options: {
          middleware: function(connect, options) {
            return [
              connect.static(__dirname + '/dist'),
              connect.static(__dirname),
            ];
          }
        }
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
        livereload: true
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
  });


  grunt.registerTask('dev', ['jshint', 'jade:dev', 'handlebars', 'stylus:dev', 'connect:dev', 'watch']);
  grunt.registerTask('prod', ['jshint', 'jade:prod', 'handlebars', 'requirejs:prod', 'stylus:prod', 'connect:prod:keepalive']);

  grunt.registerTask('default', ['dev']);

};
