require.config({

  // Make all requires relative to /.
  baseUrl: '/',

  // Map components to nice paths.
  paths: {
    text: 'components/requirejs-plugins/lib/text',
    json: 'components/requirejs-plugins/src/json',
    hb: 'components/requirejs-handlebars/hb',
    'amd-loader': 'components/amd-loader/amd-loader',
    cjs: 'components/cjs/cjs',
    handlebars: 'components/handlebars/handlebars',
    lodash: 'components/lodash/lodash',
    jquery: 'components/jquery/jquery',
    // This must work in the browser AND not explode in the r.js build step.
    livereload: 'http://' + (typeof location !== 'undefined' ?
      location.hostname : 'localhost') + ':35729/livereload.js?snipver=1'
  },

  // Load non-AMD dependencies.
  shim: {
    handlebars: {
      exports: 'Handlebars'
    }
  },

  // Remove these modules from the final build.
  stubModules: ['text', 'cjs']
});
