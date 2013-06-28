define(function(require) {

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

});
