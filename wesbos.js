/*
 * WES BOS
 * http://cowboy.github.io/wesbos/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/cowboy/wesbos/blob/gh-pages/LICENSE-MIT
 */

// WES___ BOS___ name suffixes.
var alls = "ford fun ley long mith more ney ton worth".split(" ");
var firsts = "bee bock mere twood ty wes".split(" ").concat(alls);
var lasts = "bos king on shog titch trich well where which wood".split(" ").concat(alls);

// Fortunately, both WES and BOS are 3 chars. Otherwise, I'd need TWO vars!!
var prefixlen = 3;

// Get a random array item.
Array.prototype.randomItem = function() {
  return this[Math.floor(Math.random() * this.length)];
};

// Get a random array item, as long as it's not one of the specified values.
Array.prototype.randomItemButNot = function(nots) {
  var result;
  do {
    result = this.randomItem();
  } while (nots.indexOf(result) !== -1);
  return result;
};

// Render a letter, animating from before -> after offset * 100ms.
var letterTmpl = _.template($.trim($("#letter-tmpl").text()));
$.fn.addLetter = function(before, after, offset) {
  var letter = $(letterTmpl({before: before, after: after}));
  return this.each(function() {
    letter.appendTo(this);
    setTimeout(function() {
      letter.addClass("flipped");
    }, offset * 100);
  });
};

// Render the given word, animating one letter every 100ms, starting at
// offset * 100ms.
$.fn.addWord = function(word, offset) {
  var newLetters = word.split("");
  return this.each(function() {
    var letters = $(this).data("letters") || [];
    var len = Math.max(letters.length, newLetters.length);
    for (var i = 0; i < len; i++) {
      $(this).addLetter(letters[i], newLetters[i], i + (offset || 0));
    }
    $(this).data("letters", newLetters);
  });
};

// Write some stuff to the page, loop, good times.
var initted;
var recents = [];
(function loopy() {
  var offset = 0;
  // Only draw WES BOS the first time.
  if (!initted) {
    offset = prefixlen;
    $("#first .prefix").addWord("wes");
    $("#last .prefix").addWord("bos");
    initted = true;
  }

  // Pick random suffixes that haven't been used too recently.
  var first = firsts.randomItemButNot(recents);
  recents.unshift(first);
  var last = lasts.randomItemButNot(recents);
  recents.unshift(last);
  recents = recents.slice(0, 6);

  $("#first .word").empty().addWord(first, offset);
  $("#last .word").empty().addWord(last, offset);

  setTimeout(loopy, 3000);
}());

// Sadly, a bazillion times easier than media queries.
var body = $("body");
var longest = prefixlen + _(firsts.concat(lasts)).pluck("length").max();
$(window).on("resize", (function resize() {
  var px = body.width() / (longest + 1) / 5;
  body.css("font-size", px + "px");
  return resize;
}()));
