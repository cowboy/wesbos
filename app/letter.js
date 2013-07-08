define(function(require) {
  var $ = require('jquery');
  var letterTmpl = require('hb!app/templates/letter.hbs');

  // Render a letter, animating from before -> after offset * 100ms.
  $.fn.addLetter = function(before, after, offset) {
    var letter = $(letterTmpl({before: before, after: after}));
    return this.each(function() {
      letter.appendTo(this);
      setTimeout(function() {
        letter.addClass('flipped');
      }, offset * 100);
    });
  };

  // Render the given word, animating one letter every 100ms, starting at
  // offset * 100ms.
  $.fn.addWord = function(word, offset) {
    var newLetters = word.split('');
    return this.each(function() {
      var letters = $(this).data('letters') || [];
      var len = Math.max(letters.length, newLetters.length);
      for (var i = 0; i < len; i++) {
        $(this).addLetter(letters[i], newLetters[i], i + (offset || 0));
      }
      $(this).data('letters', newLetters);
    });
  };

});
