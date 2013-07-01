var config = module.exports = {};

// Page title.
config.title = "WES BOS";

// Name prefixes.
config.prefix = {
  first: "wes",
  last: "bos"
};

// Name suffixes.
config.suffix = {};

var suffixAll = [
  "ford",
  "fun",
  "ley",
  "long",
  "mith",
  "more",
  "ney",
  "ton",
  "worth"
];

config.suffix.firsts = suffixAll.concat([
  "bee",
  "bock",
  "mere",
  "twood",
  "ty",
  "wes"
]);

config.suffix.lasts = suffixAll.concat([
  "bos",
  "king",
  "on",
  "shog",
  "titch",
  "trich",
  "well",
  "where",
  "which",
  "wood"
]);
