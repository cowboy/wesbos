require.config({

  // Make all requires relative to /.
  baseUrl: '/',

  // Map components to nice paths.
  paths: {
    'text': 'bower_components/requirejs-plugins/lib/text',
    'json': 'bower_components/requirejs-plugins/src/json',
    'hb': 'bower_components/requirejs-handlebars/hb',
    'amd-loader': 'bower_components/amd-loader/amd-loader',
    'cjs': 'bower_components/cjs/cjs',
    'handlebars': 'bower_components/handlebars/handlebars',
    'lodash': 'bower_components/lodash/lodash',
    'jquery': 'bower_components/jquery/jquery',
    // This must work in the browser AND not explode in the r.js build step.
    'livereload': 'http://' + (typeof location !== 'undefined' ?
      location.hostname : 'localhost') + ':35729/livereload.js?snipver=1'
  },

  // Load non-AMD dependencies.
  shim: {
    'handlebars': {
      exports: 'Handlebars'
    }
  },

  // Remove these modules from the final build.
  stubModules: ['text', 'cjs']
});
