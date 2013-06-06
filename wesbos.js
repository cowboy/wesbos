var letterTmpl = _.template($.trim($("#letter-tmpl").text()));

var alls = "ley ton mith ford more worth".split(" ");
var firsts = "mere ty wes twood".split(" ").concat(alls);
var lasts = "well which where titch bos wood".split(" ").concat(alls);

Array.prototype.randomItem = function() {
  return this[Math.floor(Math.random() * this.length)];
};

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

var initted;
var first, last;
(function loopy() {
  var offset = 0;
  if (!initted) {
    offset = 3;
    $("#first .prefix").empty().addWord("wes");
    $("#last .prefix").empty().addWord("bos");
    initted = true;
  }
  first = firsts.randomItemButNot([first]);
  last = lasts.randomItemButNot([first, last]);

  $("#first .word").empty().addWord(first, offset);
  $("#last .word").empty().addWord(last, offset);

  setTimeout(loopy, 3000);
}());

// Sadly, a bazillion times easier than media queries.
var body = $("body");
$(window).on("resize", (function resize() {
  body.css("font-size", (body.width() / 50) + "px");
  return resize;
}()));
