require.config({

  // override data-main from script tag during debug mode
  baseUrl: '/',

  // automatically require on page load in debug mode
  deps: ['app/index'],

  // automatically require this for production build
  insertRequire: ['app/index'],

  // map bower components to nice paths
  paths: {
    text: 'components/requirejs-plugins/lib/text',
    json: 'components/requirejs-plugins/src/json',
    handlebars: 'components/handlebars/handlebars',
    lodash: 'components/lodash/lodash',
    jquery: 'components/jquery/jquery'
  },

  // load non-amd dependencies
  shim: {
    jquery: {
      exports: '$'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  },

  stubModules: ['json', 'text']
});