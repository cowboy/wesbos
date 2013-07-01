define(function(require) {
  // Libs.
  var $ = require('jquery');
  var _ = require('lodash');

  // Mixins.
  require('./array');
  require('./letter');

  var config = require('cjs!config/app');
  var prefix = config.prefix;
  var suffix = config.suffix;

  // Sadly, a bazillion times easier than media queries.
  var body = $('body').addClass('init');
  var prefixmax = Math.max(prefix.first.length, prefix.last.length);
  var longest = prefixmax + _(suffix.firsts.concat(suffix.lasts)).pluck('length').max();
  $(window).on('resize', (function resize() {
    var px = document.documentElement.clientWidth / (longest + 1) / 5;
    body.css('font-size', px + 'px');
    return resize;
  }()));

  // Write some stuff to the page, loop, good times.
  var initted;
  var recents = [];
  (function loopy() {
    // Only draw WES BOS the first time.
    if (!initted) {
      $('#first .prefix').addWord(prefix.first);
      $('#last .prefix').addWord(prefix.last);
    }

    // Pick random suffixes that haven't been used too recently.
    var first = suffix.firsts.randomItemButNot(recents);
    recents.unshift(first);
    var last = suffix.lasts.randomItemButNot(recents);
    recents.unshift(last);
    recents = recents.slice(0, 6);

    $('#first .suffix').empty().addWord(first, initted ? 0 : prefix.first.length);
    $('#last .suffix').empty().addWord(last, initted ? 0 : prefix.last.length);

    initted = true;
    setTimeout(loopy, 3000);
  }());

});
