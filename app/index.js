define(function(require) {
  // Libs.
  var $ = require('jquery');
  var _ = require('lodash');

  // Mixins.
  require('./array');
  require('./letter');

  var config = require('json!config/config.json');

  // WES___ BOS___ name suffixes.
  var firsts = config.suffix.first.concat(config.suffix.all);
  var lasts = config.suffix.last.concat(config.suffix.all);

  // Sadly, a bazillion times easier than media queries.
  var body = $('body');
  var prefixmax = Math.max(config.prefix.first.length, config.prefix.last.length);
  var longest = prefixmax + _(firsts.concat(lasts)).pluck('length').max();
  $(window).on('resize', (function resize() {
    var px = body.width() / (longest + 1) / 5;
    body.css('font-size', px + 'px');
    return resize;
  }()));
  body.addClass('resized');

  // Write some stuff to the page, loop, good times.
  var initted;
  var recents = [];
  (function loopy() {
    // Only draw WES BOS the first time.
    if (!initted) {
      $('#first .prefix').addWord(config.prefix.first);
      $('#last .prefix').addWord(config.prefix.last);
    }

    // Pick random suffixes that haven't been used too recently.
    var first = firsts.randomItemButNot(recents);
    recents.unshift(first);
    var last = lasts.randomItemButNot(recents);
    recents.unshift(last);
    recents = recents.slice(0, 6);

    $('#first .suffix').empty().addWord(first, initted ? 0 : config.prefix.first.length);
    $('#last .suffix').empty().addWord(last, initted ? 0 : config.prefix.last.length);

    initted = true;
    setTimeout(loopy, 3000);
  }());

});
