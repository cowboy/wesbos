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
    handlebars: {
      options: {
        amd: true,
        processName: function(name) {
          return require('path').basename(name, '.hbs');
        },
      },
      templates: {
        src: 'app/templates/*.hbs',
        dest: 'build/templates.js',
      },
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
          name: 'components/almond/almond',
          out: 'build/wwwroot/app.js',
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false,
        },
      },
    },
    fix_sourcemaps: {
      prod: ['build/wwwroot/app.js.map']
    },
    connect: {
      dev: {
        options: {
          middleware: function(connect, options) {
            return [
              // Look for files in build/wwwroot.
              connect.static(__dirname + '/build/wwwroot'),
              // Then in the project root.
              connect.static(__dirname),
            ];
          },
        },
      },
      prod: {
        options: {
          base: 'build/wwwroot',
          keepalive: true,
        },
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      jshint: {
        files: ['<%= jshint.config.src %>', '<%= jshint.app.src %>'],
        tasks: ['jshint']
      },
      jade: {
        files: ['app/pages/*.jade', 'config/**/*'],
        tasks: ['jade:dev'],
      },
      handlebars: {
        files: ['<%= handlebars.templates.src %>'],
        tasks: ['handlebars'],
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

  grunt.registerMultiTask('fix_sourcemaps', 'Fix sourcemaps generated by requirejs task.', function() {
    if (this.filesSrc.length === 0) {
      grunt.log.warn('No sourcemap files found.');
    }
    this.filesSrc.forEach(function(mapfile) {
      var data = grunt.file.readJSON(mapfile);
      // Sources should be relative to the project root, but are actually
      // relative to where app.js lives. I'm not sure how to change this,
      // other than to rewrite ../ and ../../ (and ../ times 8 for !json??)
      var table = [];
      data.sources = data.sources.map(function(filepath) {
        // Fix path parts.
        var adjusted = filepath.replace(/^(\.\.\/)+/, function(parents) {
          var depth = parents.match(/\.\.\//g).length - 1;
          return ['build/', ''][depth] || '';
        });
        // Move plugin name from path-prefix to filename-prefix.
        adjusted = adjusted.replace(/(.+)!(.*)/, function(_, plugin, path) {
          var parts = path.split('/');
          return parts.concat(plugin + '__' + parts.pop()).join('/');
        });
        table.push([filepath, '→', adjusted]);
        return adjusted;
      });

      // Maybe this should go into grunt.log somewhere.
      var widths = table.reduce(function(max, s) {
        return s.map(function(s, i) { return Math.max(max[i] || 0, s.length + 1); });
      }, []);
      table.forEach(grunt.log.writetableln.bind(null, widths));

      grunt.file.write(mapfile, JSON.stringify(data));
    });
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build',
    'Build site files for testing or deployment.',
    ['jshint', 'clean', 'jade:prod', 'requirejs:prod', 'fix_sourcemaps', 'stylus:prod']);

  grunt.registerTask('deploy',
    'Deploy site via gh-pages.',
    ['build', 'gh-pages']);

  grunt.registerTask('dev',
    'Start a live-reloading dev webserver on localhost.',
    ['jshint', 'clean', 'jade:dev', 'stylus:dev', 'connect:dev', 'watch']);

  grunt.registerTask('prod',
    'Publish to build/wwwroot and start a webserver on localhost.',
    ['build', 'connect:prod:keepalive']);

  grunt.registerTask('default', ['dev']);

};
