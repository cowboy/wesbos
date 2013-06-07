var letterTmpl = _.template($.trim($("#letter-tmpl").text()));

var alls = "ley ton mith ford more worth".split(" ");
var firsts = "mere ty wes twood".split(" ").concat(alls);
var lasts = "well which where titch bos wood".split(" ").concat(alls);

var prefixlen = 3;
var longest = prefixlen + _(firsts.concat(lasts)).pluck("length").max();

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

$.fn.addLetter = function(before, after, index) {
  var letter = $(letterTmpl({before: before, after: after}));
  return this.each(function() {
    letter.appendTo(this);
    setTimeout(function() {
      letter.addClass("flipped");
    }, index * 100);
  });
};

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

// Write some stuff to the page!
var initted;
var recents = [];
(function loopy() {
  var offset = 0;
  if (!initted) {
    offset = prefixlen;
    $("#first .prefix").empty().addWord("wes");
    $("#last .prefix").empty().addWord("bos");
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
$(window).on("resize", (function resize() {
  var px = body.width() / (longest + 1) / 5;
  body.css("font-size", px + "px");
  return resize;
}()));
